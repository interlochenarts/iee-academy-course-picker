import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcademicTrack} from '../../classes/AcademicTrack';
import {CourseDataService} from '../../services/course-data.service';
import {AcademicTrackSelection} from '../../classes/AcademicTrackSelection';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-academic-track',
  templateUrl: './academic-track.component.html',
  styleUrls: ['./academic-track.component.css'],
  animations: [
    trigger('shrinkGrow', [
      state('in', style({height: '*'})),
      transition(':leave', [
        style({height: '*'}),
        animate('300ms 0ms ease-in', style({height: 0}))
      ]),
      transition('void => in', [
        style({height: 0}),
        animate('300ms 0ms ease-out', style({height: '*'}))
      ])
    ])
  ]
})
export class AcademicTrackComponent implements OnInit {
  academicTrack: AcademicTrack = new AcademicTrack();
  trackSelectionsWithAlternates: AcademicTrackSelection[] = [];
  educationId: string;
  selectedTerm: string;
  reviewAndSubmitSelected = false;
  alternatesSelected = false;
  alternatesAvailable: boolean;
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
        this.trackSelectionsWithAlternates = this.academicTrack.trackSelections.filter(ats => ats.allowAlternates === true);
        this.alternatesAvailable = this.trackSelectionsWithAlternates.length > 0;
        this.terms = Array.from(at.trackSelectionsBySemester.keys()).sort();
        this.selectedTerm = this.terms[0];
      }
    });
  }

  onChangeTerm(newTerm: string) {
    this.selectedTerm = newTerm;
    this.reviewAndSubmitSelected = false;
    this.alternatesSelected = false;
  }

  onSelectReviewAndSubmit() {
    this.selectedTerm = null;
    this.reviewAndSubmitSelected = true;
    this.alternatesSelected = false;
  }

  onSelectAlternates() {
    this.selectedTerm = null;
    this.reviewAndSubmitSelected = false;
    this.alternatesSelected = true;
  }
}
