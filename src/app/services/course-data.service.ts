import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {AcademicTrack} from '../classes/AcademicTrack';

declare const Visualforce: any;

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  public academicTracks: BehaviorSubject<Array<AcademicTrack>> = new BehaviorSubject<Array<AcademicTrack>>(null);
  public academicTrackForMajor: BehaviorSubject<AcademicTrack> = new BehaviorSubject<AcademicTrack>(null);
  public majorId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public grade: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient) {
  }

  public getMajorIdAndGrade(educationId: string): void {
    if (educationId) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_AcademyCourseRequestController.getMajorIdAndGradeByEducationId',
        educationId,
        json => {
          if (json !== null) {
            this.majorId.next(json[0]);
            this.grade.next(+json[1]);
          }
        },
        {buffer: false, escape: false}
      );
    }
  }

  public getData(majorId: string, gradeLevel: number): void {
    if (majorId) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_AcademyCourseRequestController.getAcademicTrackByMajorIdAndGrade',
        majorId, gradeLevel,
        json => {
          if (json !== null) {
            // build academic tracks
            this.academicTrackForMajor.next(AcademicTrack.createFromJson(json));
          }
        },
        {buffer: false, escape: false}
      );
    }
  }
}
