import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcademicTrack} from '../../classes/AcademicTrack';
import {CourseDataService} from '../../services/course-data.service';

@Component({
  selector: 'app-academic-track',
  templateUrl: './academic-track.component.html',
  styleUrls: ['./academic-track.component.css']
})
export class AcademicTrackComponent implements OnInit {
  academicTrack: AcademicTrack = new AcademicTrack();

  constructor(private activatedRoute: ActivatedRoute, private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      const educationId = p.get('educationId');
      if (educationId) {
        this.courseDataService.getData(educationId);
      }
    });

    this.courseDataService.academicTrackForGradeAndMajor.asObservable().subscribe(at => {
      this.academicTrack = at;
    });
  }
}
