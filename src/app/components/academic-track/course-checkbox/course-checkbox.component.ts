import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackCourseSelection} from '../../../classes/AcademicTrackCourseSelection';
import {ModalService} from '../../../services/modal.service';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';

@Component({
  selector: 'app-course-checkbox',
  templateUrl: './course-checkbox.component.html',
  styleUrls: ['./course-checkbox.component.css']
})
export class CourseCheckboxComponent implements OnInit {
  @Input() course: AcademicTrackCourseSelection;
  @Input() educationId: string;
  @Input() isPrimary: boolean;
  @Input() selection: AcademicTrackSelection;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
  }

  onClickCheckbox(): void {
    if (!this.isDisabled()) {
      if (this.isPrimary) {
        this.course.isPrimarySelection = !this.course.isPrimarySelection;
      } else {
        this.course.isAlternateSelection = !this.course.isAlternateSelection;
      }
      this.course.addOrRemoveRequest(this.educationId);
    }
  }

  showDescriptionPopup(): void {
    this.modalService.modalContent.next(this.course.courseDetail);
    this.modalService.modalVisible.next(true);
    this.modalService.modalTitle.next(this.course.courseDescription);
  }

  isDisabled(): boolean {
    if (this.isPrimary) {
      return this.course.isUpdating || this.course.isAlternateSelection || !this.course.isPrimarySelection &&
        (this.selection.selectedCount >= this.selection.maxSelections);
    } else {
      return this.course.isUpdating || this.course.isPrimarySelection;
    }
  }

  isChecked(): boolean {
    return this.course.isAlternateSelection || this.course.isPrimarySelection;
  }
}
