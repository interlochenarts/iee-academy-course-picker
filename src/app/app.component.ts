import {Component, OnInit} from '@angular/core';
import {CourseDataService} from './services/course-data.service';
import {AcademicTrack} from './classes/AcademicTrack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
