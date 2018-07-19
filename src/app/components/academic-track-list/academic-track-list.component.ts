import {Component, OnInit} from '@angular/core';
import {AcademicTrack} from '../../classes/AcademicTrack';
import {CourseDataService} from '../../services/course-data.service';

@Component({
  selector: 'app-academic-track-list',
  templateUrl: './academic-track-list.component.html',
  styleUrls: ['./academic-track-list.component.css']
})
export class AcademicTrackListComponent implements OnInit {
  academicTracks: Array<AcademicTrack> = [];

  constructor(private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.courseDataService.getDataFromFiles();
    this.courseDataService.academicTracks.asObservable().subscribe(
      tracks => {
        this.academicTracks = tracks;
      }
    );
  }

}
