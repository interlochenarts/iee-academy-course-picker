import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.css']
})
export class ReviewAndSubmitComponent implements OnInit {
  @Input() educationId: string;

  constructor() { }

  ngOnInit() {
  }

}