
// -- Define local storage --

export default class Storage {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));//
    }
    return tasks;
  }

  static addTask(task) {
    const tasks = Storage.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter((e) => e.index.toString() !== id.toString());
    tasks.sort((a, b) => a.index - b.index);
    for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
}

