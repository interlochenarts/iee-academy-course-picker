import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalContainerComponent} from './components/modal-container/modal-container.component';
import {ModalService} from './services/modal.service';
import {CourseDataService} from './services/course-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [
    ModalContainerComponent
  ]
})
export class AppComponent implements OnInit {
  instructions: string;
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true }) modalContainer: ViewContainerRef;
  modalRef: ComponentRef<ModalContainerComponent>;


  constructor(
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.courseDataService.academicTrackFromEducationRecord.asObservable().subscribe({
      next: academicTrack => {
        if (academicTrack) {
          this.instructions = academicTrack.instructions;
        }
      }
    });
    this.modalService.modalVisible.asObservable().subscribe({
      next: modalVisible => {
        if (modalVisible) {
          const factory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
          this.modalRef = this.modalContainer.createComponent(factory);
        } else {
          if (this.modalRef) {
            this.modalRef.destroy();
          }
        }
      }
    });
  }
}
