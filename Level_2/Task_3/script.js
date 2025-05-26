// Store tasks as objects with id, text, createdAt, completedAt, completed
let tasks = [];

// Generate unique ID for tasks
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Add a new task
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) {
    alert('Please enter a task.');
    return;
  }

  const newTask = {
    id: generateId(),
    text,
    createdAt: new Date(),
    completedAt: null,
    completed: false
  };

  tasks.push(newTask);
  input.value = '';
  renderTasks();
}

// Render tasks to their lists
function renderTasks() {
  const pendingUl = document.getElementById('pendingTasks');
  const completedUl = document.getElementById('completedTasks');

  // Clear existing content
  pendingUl.innerHTML = '';
  completedUl.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    // Task text container (editable)
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('completed-task');
    }
    taskInfo.appendChild(taskText);

    // Timestamps
    const ts = document.createElement('div');
    ts.className = 'timestamps';
    let createdStr = 'Added: ' + task.createdAt.toLocaleString();
    let completedStr = task.completedAt ? ' | Completed: ' + task.completedAt.toLocaleString() : '';
    ts.textContent = createdStr + completedStr;
    taskInfo.appendChild(ts);

    li.appendChild(taskInfo);

    // Actions container
    const actions = document.createElement('div');
    actions.className = 'actions';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(task.id, li, taskText, editBtn);
    actions.appendChild(editBtn);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(task.id);
    actions.appendChild(delBtn);

    if (!task.completed) {
      // Complete button
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.onclick = () => completeTask(task.id);
      actions.appendChild(completeBtn);
      pendingUl.appendChild(li);
    } else {
      completedUl.appendChild(li);
    }

    li.appendChild(actions);
  });
}

// Mark a task as complete
function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    task.completedAt = new Date();
    renderTasks();
  }
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

// Edit a task text
function editTask(id, liElement, taskTextElement, editBtn) {
  if (editBtn.textContent === 'Edit') {
    // Switch to edit mode
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskTextElement.textContent;
    input.className = 'edit-input';

    // Replace task text span with input field
    liElement.querySelector('.task-info').replaceChild(input, taskTextElement);
    editBtn.textContent = 'Save';

    // Focus on input
    input.focus();

    // Save on Enter key
    input.onkeydown = function(e) {
      if (e.key === 'Enter') {
        saveEdit();
      }
    };

    // Save function
    function saveEdit() {
      const newText = input.value.trim();
      if (!newText) {
        alert('Task cannot be empty');
        input.focus();
        return;
      }

      // Update task in tasks array
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.text = newText;
      }

      // Restore span
      taskTextElement.textContent = newText;
      liElement.querySelector('.task-info').replaceChild(taskTextElement, input);
      editBtn.textContent = 'Edit';

      // Restore edit button handler
      editBtn.onclick = () => editTask(id, liElement, taskTextElement, editBtn);
    }

    // Attach save on button click too
    editBtn.onclick = saveEdit;

  } else {
    // Save the edit is handled in the saveEdit function
  }
}

// Attach event listener to Add button
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Optional: Enter key adds task too
document.getElementById('taskInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Initial render
renderTasks();
