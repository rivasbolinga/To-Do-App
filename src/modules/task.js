// -- Class constructor of the task object

export default class Task {
  constructor(title, description, dueDate, index) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.index = index;
    this.completed = false;
    this.important = false;
  }
}