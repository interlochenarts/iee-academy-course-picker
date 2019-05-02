import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
import {ReviewCourseSelection} from '../../../classes/ReviewCourseSelection';
import {CourseDataService} from '../../../services/course-data.service';

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
  semesterComplete: Map<string, boolean> = new Map<string, boolean>();
  primaryCoursesMap = new Map<string, ReviewCourseSelection>();
  alternateCoursesMap = new Map<string, ReviewCourseSelection>();
  primaryCourses: Array<ReviewCourseSelection>;
  alternateCourses: Array<ReviewCourseSelection>;
  primaryCourseSummaryMap = new Map<number, string>();
  alternateCourseSummaryMap = new Map<number, string>();

  alternatesAvailable = false;
  submitting = false;
  readyToSubmit = false;

  get primaryErrorMessage(): string {
    const beginning = 'You have not made all of your requests for ';
    const end = '. Please complete your selections.';

    const incompleteSemesters: string[] = [];
    this.semesterComplete.forEach((isComplete, semester) => {
      if (isComplete === false) {
        incompleteSemesters.push(semester);
      }
    });

    incompleteSemesters.sort();

    return beginning + incompleteSemesters.join(' and ') + end;
  }

  constructor(private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    // iterate over all values in the track selections map
    this.trackSelectionsBySemester.forEach((trackSelections: AcademicTrackSelection[], semester: string) => {
      this.semesters.push(semester);

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

            const rcs = coursesMap.get(c.courseDescription) || new ReviewCourseSelection(c.courseDescription);
            semesters.forEach(s => rcs.semesters.add(s));
            coursesMap.set(c.courseDescription, rcs);
          });
      });
    });

    this.courseDataService.semesterComplete.asObservable().subscribe(c => this.semesterComplete = c);
    this.courseDataService.updateSemesterComplete();
    this.courseDataService.getSummaries(this.educationId);
    this.primaryCourseSummaryMap = this.courseDataService.primaryCourseSummaryMap;
    this.alternateCourseSummaryMap = this.courseDataService.alternateCourseSummaryMap;

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
      'IEE_AcademyCourseRequestController.saveRequestsComplete',
      this.educationId,
      (saved: boolean) => {
        // redirect on true
        if (saved) {
          window.location.href = 'IEE_AcademyCourseRequestsSelected?edId=' + this.educationId;
        } else {
          this.submitting = false;
          console.log('something went wrong while submitting');
        }
      },
      {buffer: false, escape: false}
    );
  }
}
