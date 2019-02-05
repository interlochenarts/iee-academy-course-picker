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

  public addOrRemoveRequest(educationId: string, updating: BehaviorSubject<boolean>, saveRelated: boolean): void {
    const requestType: string = (this.isAlternateSelection ? 'Alternate' : (this.isPrimarySelection ? 'Primary' : 'none'));
    const deleteRequest: boolean = requestType === 'none';
    updating.next(true);

    Visualforce.remoting.Manager.invokeAction(
      'IEE_AcademyCourseRequestController.addOrRemoveCourseRequest',
      educationId,
      this.courseOfferingId,
      requestType,
      deleteRequest,
      (savedId: string) => {
        this.courseRequestId = savedId;
        if (saveRelated && this.relatedCourse) {
          this.relatedCourse.addOrRemoveRequest(educationId, updating, false);
        } else {
          updating.next(false);
        }
      },
      {buffer: false, escape: false}
    );
  }
}
