import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AcademicTrack} from '../classes/AcademicTrack';

declare const Visualforce: any;

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  public academicTrackFromEducationRecord: BehaviorSubject<AcademicTrack> = new BehaviorSubject<AcademicTrack>(null);

  constructor() {
  }

  public getData(educationId: string): void {
    console.log('educationId: ' + educationId);
    if (educationId) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_AcademyCourseRequestController.getAcademicTrackByEducationId',
        educationId,
        json => {
          if (json !== null) {
            const j = JSON.parse(json);
            // build academic tracks
            console.log(j);
            this.academicTrackFromEducationRecord.next(AcademicTrack.createFromNestedJson(j));
          }
        },
        {buffer: false, escape: false}
      );
    }
  }
}
