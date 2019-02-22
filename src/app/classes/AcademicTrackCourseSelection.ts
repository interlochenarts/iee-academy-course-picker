import {BehaviorSubject} from 'rxjs';

declare const Visualforce: any;

export class AcademicTrackCourseSelection {
  courseDescription: string;
  courseNumber: string;
  defaultIndicator: boolean;
  needApprovalIndicator: boolean;
  requiredIndicator: boolean;
  sequenceNumber: number;
  gradeLevel: number;
  courseOfferingId: string;
  courseRequestId: string;
  courseDetail: string;
  relatedCourseNumber: string;
  relatedCourse: AcademicTrackCourseSelection;

  isPrimarySelection = false;
  isAlternateSelection = false;

  public static createFromJson(json: any): AcademicTrackCourseSelection {
    const academicTrackCourseSelection = new AcademicTrackCourseSelection();
    Object.assign(academicTrackCourseSelection, json);
    return academicTrackCourseSelection;
  }

  // should probably return a promise
  public addOrRemoveRequest(educationId: string, semester: string,
                            updating: BehaviorSubject<boolean>, saveRelated: boolean): Promise<boolean> {
    const requestType: string = (this.isAlternateSelection ? 'Alternate' : (this.isPrimarySelection ? 'Primary' : 'none'));
    const deleteRequest: boolean = requestType === 'none';
    updating.next(true);

    return new Promise(resolve => {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_AcademyCourseRequestController.addOrRemoveCourseRequest',
        educationId,
        this.courseOfferingId,
        requestType,
        semester,
        deleteRequest,
        (savedId: string) => {
          this.courseRequestId = savedId;
          if (saveRelated && this.relatedCourse) {
            this.relatedCourse.isPrimarySelection = this.isPrimarySelection;
            this.relatedCourse.isAlternateSelection = this.isAlternateSelection;
            this.relatedCourse.addOrRemoveRequest(educationId, semester, updating, false).then(r => resolve(true));
          } else {
            updating.next(false);
            resolve(true);
          }
        },
        {buffer: false, escape: false}
      );
    });
  }
}
