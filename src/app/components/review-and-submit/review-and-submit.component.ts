import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../classes/AcademicTrackSelection';
import {AcademicTrackCourseSelection} from '../../classes/AcademicTrackCourseSelection';

@Component({
  selector: 'app-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.css']
})
export class ReviewAndSubmitComponent implements OnInit {
  @Input() educationId: string;
  @Input() trackSelectionsBySemester: Map<string, AcademicTrackSelection[]>;
  selectedPrimaryCoursesBySemester: Map<string, AcademicTrackCourseSelection[]>;
  selectedAlternateCoursesBySemester: Map<string, AcademicTrackCourseSelection[]>;
  semesters: Array<string> = [];

  constructor() { }

  ngOnInit() {
    this.semesters = Array.from(this.selectedPrimaryCoursesBySemester.keys());
    // iterate over all values in the track selections map
    this.trackSelectionsBySemester.forEach((trackSelections: AcademicTrackSelection[], semester: string) => {
      trackSelections.forEach(ts => {
        // check each course selection for primary choices and add to primary choices map for this semester
        const primaryChoices = ts.courseSelections.filter(c => c.isPrimarySelection);
        this.selectedPrimaryCoursesBySemester.set(semester, primaryChoices);

        // check each course selection for alternate choices and add to alternate choices map for this semester
        const alternateChoices = ts.courseSelections.filter(c => c.isAlternateSelection);
        this.selectedAlternateCoursesBySemester.set(semester, alternateChoices);
      });
    });
  }
}
