import {Component, OnInit} from '@angular/core';
import {CourseDataService} from './services/course-data.service';
import {AcademicTrack} from './classes/AcademicTrack';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

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
