import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  detailText: string;
  modalTitle: string;
  @ViewChild('modalBackdrop', { static: true }) modalBackdrop: any;
  @ViewChild('modalBox', { static: true }) modalBox: any;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);

    this.modalBackdrop.nativeElement.style.height = viewHeight;
    this.modalBackdrop.nativeElement.style.width = viewWidth;

    this.modalBox.nativeElement.style.top = '75px';
    this.modalBox.nativeElement.style.maxHeight = (viewHeight - 150) + 'px';
    this.modalBox.nativeElement.style.overflow = 'auto';

    this.modalService.modalContent.asObservable().subscribe({
      next: text => {
        this.detailText = text;
      }
    });
    this.modalService.modalTitle.asObservable().subscribe({
      next: title => {
        this.modalTitle = title;
      }
    });
  }

  ngOnDestroy() {
    this.modalBackdrop.nativeElement.style.height = 0;
    this.modalBackdrop.nativeElement.style.width = 0;
  }

  closeModal() {
    this.modalService.modalContent.next('');
    this.modalService.modalTitle.next('');
    this.modalService.modalVisible.next(false);
  }
}
