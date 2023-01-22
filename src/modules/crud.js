
const listContainer = document.querySelector('.all-tasks');
export default function displayTask(task) {
  const html = `
  <div class="task-container">
   <div class="checkbox-task">
    <input class="checkbox" type="checkbox">
    <p class="task-text">${task.title}</p>
   </div>
  <div class="all-icons">
    <i class="fa-regular fa-pen-to-square"></i>
  <i class="fa-regular fa-trash-can"></i>
  </div>`;
  listContainer.innerHTML += html;
}