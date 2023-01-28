const listContainer = document.querySelector('.all-tasks');

export function displayTask(task) {
  const html = `
  <div class="task-container">
     <div class="checkbox-task">
      <input id="${task.index}" class="checkbox" type="checkbox">
      <p data-index="${task.index}" class="task-text">${task.title}</p>
     </div>
    <div class="all-icons">
    <p date-index="${task.index}" class="task-date">${task.dueDate}</p>
    <i id="${task.index}" class="fa-solid fa-magnifying-glass"></i>
      <i id="${task.index}" class="fa-regular fa-pen-to-square"></i>
    <i id="${task.index}" class="fa-regular fa-trash-can"></i>
    </div>`;
  listContainer.innerHTML += html;
}

export function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => {
    const html = `
    <div class="task-container">
     <div class="checkbox-task">
      <input id="${task.index}" class="checkbox" type="checkbox">
      <p data-index="${task.index}" class="task-text">${task.title}</p>
     </div>
    <div class="all-icons">
    <p date-index="${task.index}" class="task-date">${task.dueDate}</p>
    <i id="${task.index}" class="fa-solid fa-magnifying-glass"></i>
      <i id="${task.index}" class="fa-regular fa-pen-to-square"></i>
    <i id="${task.index}" class="fa-regular fa-trash-can"></i>
    </div>`;
    listContainer.innerHTML += html;
  });
}