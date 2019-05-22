import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackCourseSelection} from '../../../classes/AcademicTrackCourseSelection';
import {ModalService} from '../../../services/modal.service';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
import {CourseDataService} from '../../../services/course-data.service';

@Component({
  selector: 'app-course-checkbox',
  templateUrl: './course-checkbox.component.html',
  styleUrls: ['./course-checkbox.component.css']
})
export class CourseCheckboxComponent implements OnInit {
  @Input() course: AcademicTrackCourseSelection;
  @Input() educationId: string;
  @Input() isPrimary: boolean;
  @Input() semester: string;
  @Input() selection: AcademicTrackSelection;
  @Input() anyCourseUpdating = false;

  constructor(private modalService: ModalService, private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.courseDataService.anyCourseUpdating.asObservable().subscribe(up => {
      this.anyCourseUpdating = up;
    });
  }

  onClickCheckbox(): void {
    if (!this.isDisabled()) {
      if (this.isPrimary) {
        this.course.isPrimarySelection = !this.course.isPrimarySelection;
      } else {
        this.course.isAlternateSelection = !this.course.isAlternateSelection;
      }
      this.course.addOrRemoveRequest(this.educationId, this.courseDataService.anyCourseUpdating, true)
        .then( r => {this.courseDataService.updateSemesterComplete(); this.courseDataService.getSummaries(this.educationId); });
    }
  }

  showDescriptionPopup(): void {
    this.modalService.modalContent.next(this.course.courseDetail);
    this.modalService.modalVisible.next(true);
    this.modalService.modalTitle.next(this.course.courseDescription);
  }

  isDisabled(): boolean {
    if (this.isPrimary) {
      return this.anyCourseUpdating === true || this.course.isAlternateSelection || !this.course.isPrimarySelection
        && (this.selection.selectedCount >= this.selection.maxSelections);
    } else {
      return this.anyCourseUpdating === true || this.course.isPrimarySelection;
    }
  }

  isChecked(): boolean {
    return this.course.isAlternateSelection || this.course.isPrimarySelection;
  }
}
