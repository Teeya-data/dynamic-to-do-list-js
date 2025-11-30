// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false to avoid saving again
    }

    // Function to add a new task
    function addTask(taskText = null, save = true) {
        // If taskText is not provided, get from input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task when button is clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            // Update Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append remove button to list item, then append li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field if the task came from input
        if (taskText === taskInput.value.trim()) {
            taskInput.value = '';
        }

        // Save task to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Add task on button click
    addButton.addEventListener('click', () => addTask());

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
