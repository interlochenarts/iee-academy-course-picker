import {AcademicTrackSelection} from './AcademicTrackSelection';

export class AcademicTrack {
  oid: string;
  name: string;
  type: string;
  trackSelections: Array<AcademicTrackSelection> = [];
  trackSelectionsBySemester: Map<string, Array<AcademicTrackSelection>> = new Map<string, Array<AcademicTrackSelection>>();

  public static createFromNestedJson(json: any): AcademicTrack {
    const academicTrack = new AcademicTrack();
    Object.assign(academicTrack, json);
    academicTrack.trackSelections = json.trackSelections.map(
      ts => AcademicTrackSelection.createFromNestedJson(ts));

    academicTrack.trackSelections.forEach(ats => {
      const sem = ats.semester || 'Full Year';

      // get either an existing array from the map or a new array
      const tss = academicTrack.trackSelectionsBySemester.get(sem) || [];

      tss.push(ats);

      academicTrack.trackSelectionsBySemester.set(sem, tss);
    });

    return academicTrack;
  }
}
