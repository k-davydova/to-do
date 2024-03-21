export class Task {
  public title: string;
  public description: string;
  public isChecked: boolean;
  // public project: string;

  constructor(
    title: string,
    description: string,
    isChecked: boolean
    // project: string
  ) {
    this.title = title;
    this.description = description;
    this.isChecked = isChecked;
    // this.project = project;
  }
}
// export class Task {
//   public title: string;

//   constructor(title: string) {
//     this.title = title;
//   }
// }

// export class Task {
//   constructor(public title: string) {}
// }
