import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AcademicTrack} from '../classes/AcademicTrack';
import {AcademicTrackCourseSelection} from '../classes/AcademicTrackCourseSelection';

declare const Visualforce: any;

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  public academicTrackFromEducationRecord: BehaviorSubject<AcademicTrack> = new BehaviorSubject<AcademicTrack>(null);
  public anyCourseUpdating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  public static setRelatedCoursesForTrack(track: AcademicTrack): void {
    let courses: AcademicTrackCourseSelection[] = [];
    for (let i = 0; i < track.trackSelections.length; i++) {
      courses = courses.concat(track.trackSelections[i].courseSelections);
    }

    courses.forEach(course => {
      if (!course.relatedCourse && course.relatedCourseNumber) {
        for (let j = 0; j < courses.length; j++) {
          if (course.relatedCourseNumber === courses[j].courseNumber) {
            course.relatedCourse = courses[j];
            courses[j].relatedCourse = course;
            break;
          }
        }
      }
    });
  }

  constructor() {
  }

  public getData(educationId: string): void {
    if (educationId) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_AcademyCourseRequestController.getAcademicTrackByEducationId',
        educationId,
        json => {
          if (json !== null) {
            const j = JSON.parse(json);
            // build academic tracks
            const academicTrack = AcademicTrack.createFromNestedJson(j);
            this.academicTrackFromEducationRecord.next(academicTrack);
            CourseDataService.setRelatedCoursesForTrack(academicTrack);
          }
        },
        {buffer: false, escape: false}
      );
    }
  }
}
