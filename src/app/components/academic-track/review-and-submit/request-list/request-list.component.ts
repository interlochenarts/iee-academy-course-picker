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

  constructor() {
  }

  ngOnInit() {
    if (this.courses) {
      this.courses.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    }
  }

}
