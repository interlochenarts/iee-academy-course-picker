import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AcademicTrackCourseSelection} from '../../../classes/AcademicTrackCourseSelection';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-alternates',
  templateUrl: './alternates.component.html',
  styleUrls: ['./alternates.component.css'],
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
export class AlternatesComponent implements OnInit {
  @Input() trackSelectionsWithAlts: AcademicTrackSelection[];
  @Input() educationId: string;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
  }

  onClickCheckbox(isDisabled: boolean, course: AcademicTrackCourseSelection): void {
    if (!isDisabled) {
      course.isAlternateSelection = !course.isAlternateSelection;
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

  isDisabled(course: AcademicTrackCourseSelection): boolean {
    return course.isPrimarySelection;
  }
}
