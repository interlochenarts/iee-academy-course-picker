import {Component, OnInit} from '@angular/core';
import {CourseDataService} from './_services/course-data.service';
import {AcademicTrack} from './_classes/AcademicTrack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  academicTracks: Array<AcademicTrack> = [];

  constructor(private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.courseDataService.getDataFromFiles();
    this.courseDataService.academicTracks.asObservable().subscribe(
      tracks => {
        this.academicTracks = tracks;
        console.log(tracks);
      });
  }
}
