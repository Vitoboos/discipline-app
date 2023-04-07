const taskName = document.getElementById('task-name')
const taskDesc = document.getElementById('task-desc')
const addTaskBtn = document.getElementById('add-task')


addTaskBtn.addEventListener('click', () => {
    data = [taskName.value, taskDesc.value]

    if (taskName.value === ''){
        console.log('Error: Task has no name.')
        return window.electronAPI.noName()
    }

    window.electronAPI.addTask(data)
    taskName.value = ''
    taskDesc.value = ''
});
