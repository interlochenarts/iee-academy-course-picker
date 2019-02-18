import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
import {ReviewCourseSelection} from '../../../classes/ReviewCourseSelection';

declare const Visualforce: any;

@Component({
  selector: 'app-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.css']
})
export class ReviewAndSubmitComponent implements OnInit {
  @Input() educationId: string;
  @Input() trackSelectionsBySemester: Map<string, AcademicTrackSelection[]>;
  semesters: Array<string> = [];
  readyToSubmit = false;
  semesterComplete: Map<string, boolean> = new Map<string, boolean>();
  alternatesAvailable: boolean;
  submitting = false;
  primaryCoursesMap = new Map<string, ReviewCourseSelection>();
  alternateCoursesMap = new Map<string, ReviewCourseSelection>();
  primaryCourses: Array<ReviewCourseSelection>;
  alternateCourses: Array<ReviewCourseSelection>;

  constructor() {
  }

  ngOnInit() {
    this.semesters = Array.from(this.trackSelectionsBySemester.keys());
    // iterate over all values in the track selections map
    this.trackSelectionsBySemester.forEach((trackSelections: AcademicTrackSelection[], semester: string) => {
      trackSelections.forEach(ts => {
        // do any track selections allow alternates?
        this.alternatesAvailable = this.alternatesAvailable || ts.allowAlternates;

        ts.courseSelections
          .filter(c => c.isPrimarySelection || c.isAlternateSelection)
          .map(c => {
            let semesters: number[] = [];
            if (semester === 'Full Year') {
              semesters = [1, 2];
            } else {
              semesters.push(+semester.substr(semester.indexOf(' ')));
            }

            const coursesMap = (c.isPrimarySelection ? this.primaryCoursesMap : this.alternateCoursesMap);

            console.log('current course: ' + c.courseDescription + ', semesters: ' + semesters);
            const rcs = coursesMap.get(c.courseDescription) || new ReviewCourseSelection(c.courseDescription);
            semesters.forEach(s => rcs.semesters.add(s));
            coursesMap.set(c.courseDescription, rcs);
          });
      });

      this.semesterComplete.set(semester, trackSelections.reduce((complete, ts) => {
        return complete && (ts.selectedCount >= ts.minSelections);
      }, true));
    });

    console.log('primaryCoursesMap:');
    console.log(this.primaryCoursesMap);

    console.log('alternateCoursesMap:');
    console.log(this.alternateCoursesMap);

    this.primaryCourses = Array.from(this.primaryCoursesMap.values());
    this.alternateCourses = Array.from(this.alternateCoursesMap.values());
  }

  canClickCheckbox(): boolean {
    return Array.from(this.semesterComplete.values()).reduce((complete, semCom) => {
      return complete && semCom;
    }, true);
  }

  onClickCheckbox() {
    if (this.canClickCheckbox()) {
      this.readyToSubmit = this.readyToSubmit !== true;
    }
  }

  onSubmit() {
    this.submitting = true;
    Visualforce.remoting.Manager.invokeAction(
      'IEE_ElectivePicker_Controller.saveElectiveComplete',
      this.educationId,
      (saved: boolean) => {
        // redirect on true
        if (saved) {
          window.location.href = 'IEE_AcademyCoursesRequested?eid=' + this.educationId;
        } else {
          this.submitting = false;
          console.log('something went wrong while submitting');
        }
      },
      {buffer: false, escape: false}
    );
  }
}
