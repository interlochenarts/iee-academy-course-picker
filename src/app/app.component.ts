import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalContainerComponent} from './modal-container/modal-container.component';
import {ModalService} from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [
    ModalContainerComponent
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('modalContainer', {read: ViewContainerRef}) modalContainer: ViewContainerRef;
  modalRef: ComponentRef<ModalContainerComponent>;


  constructor(
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {

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
