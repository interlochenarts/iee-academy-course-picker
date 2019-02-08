class ReviewCourseSelection {
  name: string;
  semesters: number[] = [];

  constructor(name: string) {
    this.name = name;
  }

  get semesterDescription(): string {
    this.semesters.sort();
    return 'Semester' +
      (this.semesters.length > 1 ? 's' : '') +
      ' ' +
      this.semesters.join(' and ');
  }
}
