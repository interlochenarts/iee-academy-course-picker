import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
import {AcademicTrackCourseSelection} from '../../../classes/AcademicTrackCourseSelection';

declare const Visualforce: any;

@Component({
  selector: 'app-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.css']
})
export class ReviewAndSubmitComponent implements OnInit {
  @Input() educationId: string;
  @Input() trackSelectionsBySemester: Map<string, AcademicTrackSelection[]>;
  courseSelections = new Array<AcademicTrackCourseSelection>();
  semesters: Array<string> = [];
  readyToSubmit = false;
  semesterComplete: Map<string, boolean> = new Map<string, boolean>();
  alternatesAvailable: boolean;
  submitting = false;
  primaryCourses = new Map<string, ReviewCourseSelection>();
  alternateCourses = new Map<string, ReviewCourseSelection>();

  constructor() {
  }

  ngOnInit() {
    this.semesters = Array.from(this.trackSelectionsBySemester.keys());
    // iterate over all values in the track selections map
    this.trackSelectionsBySemester.forEach((trackSelections: AcademicTrackSelection[], semester: string) => {
      trackSelections.forEach(ts => {
        // add track selections to list
        this.courseSelections = this.courseSelections.concat(ts.courseSelections);

        // do any track selections allow alternates?
        this.alternatesAvailable = this.alternatesAvailable || ts.allowAlternates;

        ts.courseSelections
          .filter(c => c.isPrimarySelection || c.isAlternateSelection)
          .map(c => {
            let semesters: number[] = [];
            if (semester === 'Full Year') {
              semesters = [1, 2];
            } else {
              const sem: number = +semester.split(' ');
              semesters.push(sem);
            }

            const coursesMap = (c.isPrimarySelection ? this.primaryCourses : this.alternateCourses);

            const rcs = coursesMap.get(c.courseDescription) || new ReviewCourseSelection(c.courseDescription);
            rcs.semesters = rcs.semesters.concat(semesters);
            coursesMap.set(c.courseDescription, rcs);
          });
      });

      this.semesterComplete.set(semester, trackSelections.reduce((complete, ts) => {
        return complete && (ts.selectedCount >= ts.minSelections);
      }, true));
    });
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
