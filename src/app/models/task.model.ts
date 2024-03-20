export class Task {
  public title: string;
  public description: string;
  public isChecked: boolean;

  constructor(title: string, description: string, isChecked: boolean) {
    this.title = title;
    this.description = description;
    this.isChecked = isChecked;
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
