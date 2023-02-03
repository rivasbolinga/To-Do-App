import { 
  displayTasks,
  displayChecked,
  displayImportant
} from "./display";

const allLink  = document.querySelector('.all');
const importantLink = document.querySelector('.important');
const checkedLink = document.querySelector('.checked');
allLink.addEventListener('click', displayTasks);
importantLink.addEventListener('click', displayImportant);
checkedLink.addEventListener('click',displayChecked);

