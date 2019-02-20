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

  constructor() { }

  ngOnInit() {
  }

}
