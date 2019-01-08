import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcademicTrack} from '../../classes/AcademicTrack';
import {CourseDataService} from '../../services/course-data.service';
import {AcademicTrackCourseSelection} from '../../classes/AcademicTrackCourseSelection';
import {AcademicTrackSelection} from '../../classes/AcademicTrackSelection';
import {ModalService} from '../../services/modal.service';
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
  educationId: string;
  selectedTerm: string;
  reviewAndSubmitSelected = false;
  alternatesSelected = false;
  alternatesAvailable: boolean;
  terms: Array<string>;

  constructor(private activatedRoute: ActivatedRoute, private courseDataService: CourseDataService, private modalService: ModalService) {
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
    this.reviewAndSubmitSelected = false;
    this.alternatesSelected = false;
  }

  onSelectReviewAndSubmit() {
    this.selectedTerm = null;
    this.reviewAndSubmitSelected = true;
    this.alternatesSelected = false;
  }

  onSelectAlternates() {
    this.alternatesSelected = true;
    this.reviewAndSubmitSelected = false;
    this.selectedTerm = null;
  }

  onClickCheckbox(isDisabled: boolean, course: AcademicTrackCourseSelection, isPrimary: boolean): void {
    if (!isDisabled) {
      if (isPrimary) {
        course.isPrimarySelection = !course.isPrimarySelection;
      } else {
        course.isAlternateSelection = !course.isAlternateSelection;
      }
      course.addOrRemoveRequest(this.educationId);
    }
  }

  onToggleTrackSelection(selection: AcademicTrackSelection) {
    selection.expanded = !selection.expanded;
  }

  showDescriptionPopup(course: AcademicTrackCourseSelection): void {
    this.modalService.modalContent.next(course.courseDetail);
    this.modalService.modalVisible.next(true);
    this.modalService.modalTitle.next(course.courseDescription);
  }

  isPrimaryDisabled(course: AcademicTrackCourseSelection, selection: AcademicTrackSelection): boolean {
    return course.isAlternateSelection || !course.isPrimarySelection && (selection.selectedCount >= selection.maxSelections);
  }

  isAlternateDisabled(course: AcademicTrackCourseSelection): boolean {
    return course.isPrimarySelection;
  }
}
