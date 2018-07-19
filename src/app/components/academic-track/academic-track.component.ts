import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AcademicTrack} from '../../classes/AcademicTrack';
import {CourseDataService} from '../../services/course-data.service';
import {AcademicTrackSelection} from '../../classes/AcademicTrackSelection';

@Component({
  selector: 'app-academic-track',
  templateUrl: './academic-track.component.html',
  styleUrls: ['./academic-track.component.css']
})
export class AcademicTrackComponent implements OnInit {
  displayedTrackSelections: Array<AcademicTrackSelection> = [];
  academicTrack: AcademicTrack = new AcademicTrack();
  gradeLevels = ['09', '10', '11', '12', '13'];

  constructor(private activatedRoute: ActivatedRoute, private courseDataService: CourseDataService) {
  }

  ngOnInit() {
    this.courseDataService.getDataFromFiles();
    this.courseDataService.academicTracks.asObservable().subscribe(
      tracks => {
        if (tracks) {
          this.activatedRoute.paramMap.subscribe((pm: ParamMap) => {
            this.academicTrack = tracks.find(t => t.oid === pm.get('academicTrackOid'));
          });
        }
      });
  }

  onChangeGrade(gradeLevel: number) {
    this.displayedTrackSelections = this.academicTrack.selections.filter(s => s.gradeLevel === gradeLevel);
  }
}
