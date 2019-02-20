import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-review-alert-message',
  templateUrl: './review-alert-message.component.html',
  styleUrls: ['./review-alert-message.component.css']
})
export class ReviewAlertMessageComponent implements OnInit {
  @Input() visible: boolean;
  @Input() message: string;
  @Input() alertType: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
