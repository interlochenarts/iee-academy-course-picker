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
      } else {
        this.semesterOne.push(this.courseRequestSummaries.get(1));
      }
      if (this.courseRequestSummaries.get(2)) {
        this.semesterTwo = this.courseRequestSummaries.get(2).split('\n');
      } else {
        this.semesterTwo.push(this.courseRequestSummaries.get(2));
      }
      const diff = Math.abs(this.semesterOne.length - this.semesterTwo.length);
      const blankSpaces: Array<string> = [];
      for (let i = 0; i < diff; i++) {
        blankSpaces.push('');
      }
      if (this.semesterOne.length > this.semesterTwo.length) {
        // add to semesterTwo
        this.semesterTwo = this.semesterTwo.concat(blankSpaces);
      } else if (this.semesterOne.length < this.semesterTwo.length) {
        // add to semesterOne
        this.semesterOne = this.semesterOne.concat(blankSpaces);
      }
    }
  }
}
