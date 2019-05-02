export class ReviewCourseSelection {
  name: string;
  semesters: Set<number> = new Set<number>();

  constructor(name: string) {
    this.name = name;
  }

  get semesterDescription(): string {
    return Array.from(this.semesters).sort().join(' and ');
  }
}
