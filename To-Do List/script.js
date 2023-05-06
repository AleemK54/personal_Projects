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
            <li class="flex-grow ml-16 cursor-pointer">${task}</li>
            <button class="ml-4 bg-red-500 text-white px-3 py-3 rounded hover:bg-red-300">Delete</button>
            <button class="ml-4 mr-4 bg-blue-500 text-white px-5 py-3 rounded hover:bg-blue-300">Edit</button>
        `;
    taskItem.querySelector('.bg-red-500').addEventListener('click', deleteTask);
    taskItem.querySelector('.bg-blue-500').addEventListener('click', editTask);
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
    const editButton = taskItem.querySelector('.bg-blue-500');
    const deleteButton = taskItem.querySelector('.bg-red-500');
    const saveButton = document.createElement('button');
    saveButton.classList.add('ml-4', 'mr-4', 'bg-green-500', 'text-white', 'px-3', 'py-3', "rounded", 'hover:bg-green-300');
    saveButton.textContent = 'Save';
    taskText.setAttribute('contenteditable', 'true');
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';
    taskText.classList.add("ml-16");
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
