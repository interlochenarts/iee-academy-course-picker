import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcademicTrack} from '../../classes/AcademicTrack';
import {CourseDataService} from '../../services/course-data.service';
import {AcademicTrackCourseSelection} from '../../classes/AcademicTrackCourseSelection';

@Component({
  selector: 'app-academic-track',
  templateUrl: './academic-track.component.html',
  styleUrls: ['./academic-track.component.css']
})
export class AcademicTrackComponent implements OnInit {
  academicTrack: AcademicTrack = new AcademicTrack();
  educationId: string;
  selectedTerm: string;
  terms: Array<string>;

  constructor(private activatedRoute: ActivatedRoute, private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.educationId = p.get('educationId');
      if (this.educationId) {
        this.courseDataService.getData(this.educationId);
      }
    });

    this.courseDataService.academicTrackFromEducationRecord.asObservable().subscribe(at => {
      if (at) {
        this.academicTrack = at;
        this.terms = Array.from(at.trackSelectionsBySemester.keys()).sort();
        this.selectedTerm = this.terms[0];
      }
    });
  }

  onChangeTerm(newTerm: string) {
    this.selectedTerm = newTerm;
  }

  onClickCheckbox($event: Event, course: AcademicTrackCourseSelection): void {
    course.addOrRemoveRequest(this.educationId);
  }
}
