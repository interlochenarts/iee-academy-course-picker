import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
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

  constructor() {
  }

  ngOnInit() {
  }

  onToggleTrackSelection(selection: AcademicTrackSelection) {
    selection.expanded = !selection.expanded;
  }
}
