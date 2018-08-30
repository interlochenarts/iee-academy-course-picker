import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcademicTrack} from '../../classes/AcademicTrack';
import {CourseDataService} from '../../services/course-data.service';
import {AcademicTrackSelection} from '../../classes/AcademicTrackSelection';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-academic-track',
  templateUrl: './academic-track.component.html',
  styleUrls: ['./academic-track.component.css']
})
export class AcademicTrackComponent implements OnInit {
  displayedTrackSelections: Array<AcademicTrackSelection> = [];
  academicTrack: AcademicTrack = new AcademicTrack();
  gradeLevel: number;
  majorId: string;

  constructor(private activatedRoute: ActivatedRoute, private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      const educationId = p.get('educationId');
      this.courseDataService.getMajorIdAndGrade(educationId);
    });

    const majIdObs = this.courseDataService.majorId.asObservable();
    const gradeObs = this.courseDataService.grade.asObservable();

    combineLatest(majIdObs, gradeObs).subscribe(o => {
      [this.majorId, this.gradeLevel] = o;

      this.courseDataService.getData(this.majorId, this.gradeLevel);
    });

    this.courseDataService.academicTrackForMajor.asObservable().subscribe(at => {
      this.academicTrack = at;
    });
  }
}
