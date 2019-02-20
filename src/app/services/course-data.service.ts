import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AcademicTrack} from '../classes/AcademicTrack';
import {AcademicTrackCourseSelection} from '../classes/AcademicTrackCourseSelection';

declare const Visualforce: any;

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  public academicTrackFromEducationRecord = new BehaviorSubject<AcademicTrack>(null);
  public anyCourseUpdating = new BehaviorSubject<boolean>(false);
  public semesterComplete = new BehaviorSubject<Map<string, boolean>>(null);

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

  public updateSemesterComplete(): void {
    const at: AcademicTrack = this.academicTrackFromEducationRecord.getValue();
    const complete = new Map<string, boolean>();
    at.trackSelectionsBySemester.forEach((trackSelections, semester) => {
      complete.set(semester, trackSelections.reduce((complete, ts) => {
        return complete && (ts.selectedCount >= ts.minSelections);
      }, true));
    });
    this.semesterComplete.next(complete);
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
            this.updateSemesterComplete();
          }
        },
        {buffer: false, escape: false}
      );
    }
  }
}
