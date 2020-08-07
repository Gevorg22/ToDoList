'use strict';

const listGroup = document.querySelector('.list-group');
const formInput = document.querySelector('.addNewTask');
const form = document.querySelector('.newTaskForm');

const generateId = () => `${Math.round(Math.random() * 1e8).toString(16)}`;

let localSave = JSON.parse(localStorage.getItem('todo')) || [];

const showNotification = type => {
    let newElement = document.createElement('div');
    switch(type) {
        case 'new':
            newElement.className = 'alert alert-primary'; 
            newElement.textContent = 'Task added!';
            break;
        case 'delete':
            newElement.className = 'alert alert-warning'; 
            newElement.textContent = 'Task deleted!';
            break;
    }
    document.querySelector('.show-notification').insertAdjacentElement('afterbegin', newElement);
    setTimeout(() => {
        newElement.style.opacity = '1'
    }, 200);
    setTimeout(function(){
        newElement.remove();
    }, 2600);
};

const renderOperation = taskText => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `
    <span contenteditable='true' class="task-title">${taskText.description}</span>
    <div>
        <button type="button" data-id="${taskText.id}" class="btn btn-light task-delete">x</button>
    </div>
    `;
    listGroup.insertAdjacentElement('BeforeEnd', listItem);
};

const addTask = event => {
    event.preventDefault();
    if (formInput.value.match(/^[ ]+$/) || formInput.value == '') {
        formInput.value = '';
    } else {
        const taskValue = formInput.value.trim();
        const taskText = {
            id: generateId(),
            description: taskValue
        }
        showNotification('new');
        formInput.value = '';
        localSave.push(taskText);
        init();
    }
    formInput.focus();
};

const taskOperation = event => {
    const target = event.target;
    if (target.classList.contains('task-delete')){
        target.closest('.list-group-item').remove();
        localSave = localSave.filter(item => item.id !== target.dataset.id);
        showNotification('delete');
        init();
    }
}

const init = () => {
    listGroup.textContent = '';
    localSave.forEach(renderOperation);
    localStorage.setItem('todo', JSON.stringify(localSave));
};

form.addEventListener('submit', addTask);

listGroup.addEventListener('click', taskOperation)

init();
