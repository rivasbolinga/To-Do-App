
const listContainer = document.querySelector('.all-tasks');

export  function displayTask(task) {

   const html =`
  <div class="task-container">
   <div class="checkbox-task">
    <input id="${task.index}" class="checkbox" type="checkbox">
    <p class="task-text">${task.title}</p>
   </div>
  <div class="all-icons">
    <i id="${task.index}" class="fa-regular fa-pen-to-square"></i>
  <i id="${task.index}" data-index="${task.index}" class="fa-regular fa-trash-can"></i>
  </div>`;
  listContainer.innerHTML += html;
}

export function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    const html =`
    <div class="task-container">
     <div class="checkbox-task">
      <input id="${task.index}" class="checkbox" type="checkbox">
      <p class="task-text">${task.title}</p>
     </div>
    <div class="all-icons">
      <i id="${task.index}" class="fa-regular fa-pen-to-square"></i>
    <i id="${task.index}" data-index="${task.index}" class="fa-regular fa-trash-can"></i>
    </div>`;
    listContainer.innerHTML += html;
  });
}