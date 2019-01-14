import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackCourseSelection} from '../../../classes/AcademicTrackCourseSelection';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
import {ModalService} from '../../../services/modal.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-track-selections',
  templateUrl: './track-selections.component.html',
  styleUrls: ['./track-selections.component.css'],
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
export class TrackSelectionsComponent implements OnInit {
  @Input() educationId: string;
  @Input() trackSelections: AcademicTrackSelection[];

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
  }

  onClickCheckbox(isDisabled: boolean, course: AcademicTrackCourseSelection): void {
    if (!isDisabled) {
      course.isPrimarySelection = !course.isPrimarySelection;
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

  isDisabled(course: AcademicTrackCourseSelection, selection: AcademicTrackSelection): boolean {
    return course.isAlternateSelection || !course.isPrimarySelection && (selection.selectedCount >= selection.maxSelections);
  }
}
