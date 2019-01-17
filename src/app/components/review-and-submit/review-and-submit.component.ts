import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../classes/AcademicTrackSelection';
import {AcademicTrackCourseSelection} from '../../classes/AcademicTrackCourseSelection';

declare const Visualforce: any;

@Component({
  selector: 'app-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.css']
})
export class ReviewAndSubmitComponent implements OnInit {
  @Input() educationId: string;
  @Input() trackSelectionsBySemester: Map<string, AcademicTrackSelection[]>;
  selectedPrimaryCoursesBySemester: Map<string, AcademicTrackCourseSelection[]> = new Map<string, AcademicTrackCourseSelection[]>();
  selectedAlternateCoursesBySemester: Map<string, AcademicTrackCourseSelection[]> = new Map<string, AcademicTrackCourseSelection[]>();
  semesters: Array<string> = [];
  readyToSubmit = false;
  semesterComplete: Map<string, boolean> = new Map<string, boolean>();
  semesterHasAlternates: Map<string, boolean> = new Map<string, boolean>();
  submitting = false;

  constructor() {
  }

  ngOnInit() {
    this.semesters = Array.from(this.trackSelectionsBySemester.keys());
    // iterate over all values in the track selections map
    this.trackSelectionsBySemester.forEach((trackSelections: AcademicTrackSelection[], semester: string) => {
      trackSelections.forEach(ts => {
        // check each course selection for primary choices and add to primary choices map for this semester
        const primaryChoices = ts.courseSelections.filter(c => c.isPrimarySelection);
        this.selectedPrimaryCoursesBySemester.set(semester, primaryChoices);

        // check each course selection for alternate choices and add to alternate choices map for this semester
        const alternateChoices = ts.courseSelections.filter(c => c.isAlternateSelection);
        this.selectedAlternateCoursesBySemester.set(semester, alternateChoices);

        this.semesterComplete.set(semester, trackSelections.reduce((complete, trackSelection) => {
          return complete && (trackSelection.selectedCount >= trackSelection.minSelections);
        }, true));

        this.semesterHasAlternates.set(semester, trackSelections.reduce((hasAlternates, trackSelections) => {
          return hasAlternates || trackSelections.allowAlternates;
        }, false));
      });
    });
  }

  canClickCheckbox(): boolean {
    return Array.from(this.semesterComplete.values()).reduce((complete, semCom) => {
      return complete && semCom;
    }, false);
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
