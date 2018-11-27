import {AcademicTrackCourseSelection} from './AcademicTrackCourseSelection';

export class AcademicTrackSelection {
  oid: string;
  selectionName: string;
  subjectArea: string;
  maxSelections: number;
  minSelections: number;
  allowAlternates: boolean;
  sequenceNumber: number;
  instructions: string;
  semester: string;
  gradeLevel: number;
  academicTrackOid: string;
  courseSelections: Array<AcademicTrackCourseSelection> = [];

  public static createFromNestedJson(json: any): AcademicTrackSelection {
    const academicTrackSelection = new AcademicTrackSelection();
    Object.assign(academicTrackSelection, json);
    academicTrackSelection.courseSelections =
      json.courseSelections.map(c => AcademicTrackCourseSelection.createFromJson(c));
    return academicTrackSelection;
  }

  get selectedCount(): number {
    return this.courseSelections.reduce(
      (accumulator, selection) => selection.isPrimarySelection ? accumulator + 1 : accumulator, 0
    );
  }
}
