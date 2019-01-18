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

  isPrimarySelection = false;
  isAlternateSelection = false;

  public static createFromJson(json: any): AcademicTrackCourseSelection {
    const academicTrackCourseSelection = new AcademicTrackCourseSelection();
    Object.assign(academicTrackCourseSelection, json);
    return academicTrackCourseSelection;
  }

  public addOrRemoveRequest(educationId: string): void {
    const requestType: string = (this.isAlternateSelection ? 'Alternate' : (this.isPrimarySelection ? 'Primary' : 'none'));
    const deleteRequest: boolean = requestType === 'none';

    Visualforce.remoting.Manager.invokeAction(
      'IEE_AcademyCourseRequestController.addOrRemoveCourseRequest',
      educationId,
      this.courseOfferingId,
      requestType,
      deleteRequest,
      (savedId: string) => {
        this.courseRequestId = savedId;
      },
      {buffer: false, escape: false}
    );
  }
}
