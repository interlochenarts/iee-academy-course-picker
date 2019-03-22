import {Component, Input, OnInit} from '@angular/core';
import {ReviewCourseSelection} from '../../../../classes/ReviewCourseSelection';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  @Input() selectionType: string;
  @Input() courses: Array<ReviewCourseSelection>;
  @Input() courseRequestSummaries: Map<number, string>;
  semesterOne: Array<string> = [];
  semesterTwo: Array<string> = [];

  constructor() {
  }

  ngOnInit() {
    if (this.courses) {
      this.courses.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    }
    if (this.courseRequestSummaries) {
      if (this.courseRequestSummaries.get(1)) {
        this.semesterOne = this.courseRequestSummaries.get(1).split('\n');
      }
      if (this.courseRequestSummaries.get(2)) {
        this.semesterTwo = this.courseRequestSummaries.get(2).split('\n');
      }
      const maxLength = this.semesterOne.length >= this.semesterTwo.length ? this.semesterOne.length : this.semesterTwo.length;
      this.semesterOne.length = maxLength;
      this.semesterTwo.length = maxLength;
    }
  }
}
