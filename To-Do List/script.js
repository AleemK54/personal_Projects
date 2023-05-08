const taskList = document.getElementById('task-list');
const allTask = document.getElementById("all-task");
const completed = document.getElementById("complete");
const remaining = document.getElementById("remaining");

let taskCount = 0;
let remainingCount = 0;
let completedCount = 0;



function addTask(event) {
    event.preventDefault();
    const input = event.target[0];
    const task = input.value.trim();
    if (task === '') return;
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
    input.value = '';
    taskCount++;
    remainingCount++;
    allTask.innerText = taskCount;
    remaining.innerText = remainingCount;
}

function createTaskItem(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('flex', 'justify-between', 'items-center', 'py-2');
    taskItem.innerHTML = `
            <li class="flex-grow ml-52 cursor-pointer py-3">${task}</li>

            <svg id="delete-button" class="w-6 h-6 bg-white dark:text-red-500 hover:text-red-100 cursor-pointer stroke-current ml-5 mr-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path class= "pointer-events-none"
            stroke-linecap="round" stroke-linejoin="round" 
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0">
            </path>
            </svg>

            <svg id="edit-button" class="w-6 h-6 dark:text-blue-300 bg-white hover:text-blue-100 rounded cursor-pointer stroke-current mr-48 ml-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> 
            <path class= "pointer-events-none"
            stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125">
            </path>
            </svg>
        `;
    taskItem.querySelector('#delete-button').addEventListener('click', deleteTask);
    taskItem.querySelector('#edit-button').addEventListener('click', editTask);
    taskItem.querySelector('.flex-grow').addEventListener('click', completeTask);
    return taskItem;
}

function deleteTask(event) {
    event.preventDefault();
    const taskItem = event.target.parentNode;
    taskList.removeChild(taskItem); 
    const myTask= taskItem.querySelector('.flex-grow');
        if(myTask.classList.contains("line-through")) {
            completedCount--;
        } else {
            remainingCount--;
        }
    taskCount--;
    allTask.innerText = taskCount;
    completed.innerText = completedCount;
    remaining.innerText = remainingCount;
}

function completeTask(event){
    event.preventDefault();
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('line-through');
        event.target.classList.toggle("text-green-800");
        if (event.target.classList.contains('line-through')) {
          remainingCount--;
          completedCount++;
        } else {
          remainingCount++;
          completedCount--;
        }
        remaining.innerText = remainingCount;
        completed.innerText = completedCount;
      }
}
 
function editTask(event) {
    event.preventDefault();
    const taskItem = event.target.parentNode;
    const taskText = taskItem.querySelector('.flex-grow');
    const editButton = taskItem.querySelector('#edit-button');
    const deleteButton = taskItem.querySelector('#delete-button');
    const saveButton = document.createElement('button');
    saveButton.classList.add('ml-4', 'mr-4', 'bg-green-500', 'text-white', 'px-3', 'py-3', "rounded", 'hover:bg-green-300');
    saveButton.textContent = 'Save';
    taskText.setAttribute('contenteditable', 'true');
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';
    taskText.classList.add("ml-52");
    taskText.focus();
    taskText.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            saveButton.click();
        }
    });
    saveButton.addEventListener('click', function() {
        taskText.setAttribute('contenteditable', 'false');
        editButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
        saveButton.remove();
    });
    taskItem.appendChild(saveButton);
}

document.querySelector('form').addEventListener('submit', addTask);
