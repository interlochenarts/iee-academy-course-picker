import {AcademicTrackSelection} from './AcademicTrackSelection';

export class AcademicTrack {
  oid: string;
  name: string;
  maxCredit: number;
  minCredit: number;
  type: string;
  trackSelections: Array<AcademicTrackSelection> = [];

  public static createFromNestedJson(json: any): AcademicTrack {
    const academicTrack = new AcademicTrack();
    Object.assign(academicTrack, json);
    academicTrack.trackSelections = json.trackSelections.map(ts => AcademicTrackSelection.createFromNestedJson(ts));
    return academicTrack;
  }
}
