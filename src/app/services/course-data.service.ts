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
  public primaryCourseSummaryMap = new Map<number, string>(null);
  public alternateCourseSummaryMap = new Map<number, string>(null);

  public static setRelatedCoursesForTrack(track: AcademicTrack): void {
    const courses: AcademicTrackCourseSelection[] = [];
    track.trackSelections.forEach(trackSelection => {
      courses.push.apply(courses, trackSelection.courseSelections);
    });

    courses.forEach(course => {
      if (!course.relatedCourse && course.relatedCourseNumber) {
        for (let j = 0; j < courses.length; j++) {
          if (course.relatedCourseNumber === courses[j].courseNumber) {
            course.relatedCourse = courses[j];
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
      complete.set(semester, trackSelections.reduce((isComplete, ts) => {
        return isComplete && (ts.selectedCount >= ts.minSelections);
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
            CourseDataService.setRelatedCoursesForTrack(academicTrack);
            this.academicTrackFromEducationRecord.next(academicTrack);
            this.updateSemesterComplete();
          }
        },
        {buffer: false, escape: false}
      );
    }
  }

  public getSummaries(educationId: string): void {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_AcademyCourseRequestController.getCourseRequestSummariesByEducationId',
      educationId,
      (json: string) => {
        if (json) {
          const j = JSON.parse(json);
          this.primaryCourseSummaryMap.set(1, j.Semester_1_Primary_Requests__c);
          this.primaryCourseSummaryMap.set(2, j.Semester_2_Primary_Requests__c);
          this.alternateCourseSummaryMap.set(1, j.Semester_1_Alternate_Requests__c);
          this.alternateCourseSummaryMap.set(2, j.Semester_2_Alternate_Requests__c);
        } else {
          console.log('something went wrong while retrieving summaries');
        }
      },
      {buffer: false, escape: false}
    );
  }
}
