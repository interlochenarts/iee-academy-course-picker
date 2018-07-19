import {AcademicTrackSelection} from './AcademicTrackSelection';

export class AcademicTrack {
  oid: string;
  name: string;
  maxCredit: number;
  minCredit: number;
  type: string;
  selections: Array<AcademicTrackSelection> = [];

  public static createFromJson(json: any): AcademicTrack {
    const academicTrack = new AcademicTrack();
    Object.assign(academicTrack, json);
    return academicTrack;
  }

  addSelection(selection: AcademicTrackSelection): void {
    this.selections.push(selection);
  }
}
