import {Component, Input, OnInit} from '@angular/core';
import {AcademicTrackSelection} from '../../../classes/AcademicTrackSelection';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  constructor() {
  }

  ngOnInit() {
  }

  onToggleTrackSelection(selection: AcademicTrackSelection) {
    selection.expanded = !selection.expanded;
  }
}
