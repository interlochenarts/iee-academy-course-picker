import {AcademicTrackSelection} from './AcademicTrackSelection';

export class AcademicTrack {
  oid: string;
  name: string;
  maxCredit: number;
  minCredit: number;
  type: string;
  trackSelections: Array<AcademicTrackSelection> = [];
  trackSelectionsBySemester: Map<string, Array<AcademicTrackSelection>> = new Map<string, Array<AcademicTrackSelection>>();

  public static createFromNestedJson(json: any): AcademicTrack {
    const academicTrack = new AcademicTrack();
    Object.assign(academicTrack, json);
    academicTrack.trackSelections = json.trackSelections.map(ts => AcademicTrackSelection.createFromNestedJson(ts));

    academicTrack.trackSelections.forEach(ats => {
      let sem: string = ats.selectionName.split('-')[1];
      sem = (!sem ? 'Semester 1' : sem.trim());

      let tss = academicTrack.trackSelectionsBySemester.get(sem);
      if (!tss) {
        tss = [];
      }

      tss.push(ats);

      academicTrack.trackSelectionsBySemester.set(sem, tss);
    });

    return academicTrack;
  }
}
