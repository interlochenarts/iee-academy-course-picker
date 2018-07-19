import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {AcademicTrack} from '../classes/AcademicTrack';
import {AcademicTrackSelection} from '../classes/AcademicTrackSelection';
import {AcademicTrackCourseSelection} from '../classes/AcademicTrackCourseSelection';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  public academicTracks: BehaviorSubject<Array<AcademicTrack>> = new BehaviorSubject<Array<AcademicTrack>>(null);

  constructor(private http: HttpClient) {
  }

  public getData(): void {
  }

  public getDataFromFiles(): void {
    this.http.get('assets/json/academicTracks.json').subscribe((trackData: Array<AcademicTrack>) => {
      const tracks: Array<AcademicTrack> = trackData.map(at => AcademicTrack.createFromJson(at));

      this.http.get('assets/json/academicTrackSelections.json').subscribe((selectionData: Array<Object>) => {
        const selections: Array<AcademicTrackSelection> = selectionData.map(sel => AcademicTrackSelection.createFromJson(sel));

        this.http.get('assets/json/academicTrackCourseSelections.json').subscribe((courseSelectionData: Array<Object>) => {
          courseSelectionData.map(cs => {
            const trackCourseSelection: AcademicTrackCourseSelection = AcademicTrackCourseSelection.createFromJson(cs);
            selections.find(s => s.oid === trackCourseSelection.academicTrackSelectionOid).addCourseSelection(trackCourseSelection);
            return trackCourseSelection;
          });

          selections.forEach((academicTrackSelection: AcademicTrackSelection) => {
            tracks.find(t => t.oid === academicTrackSelection.academicTrackOid).addSelection(academicTrackSelection);
          });
        });

      });

      this.academicTracks.next(tracks);
    });
  }
}
