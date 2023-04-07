const createTaskBtn = document.getElementById('createTaskBtn')
const taskBox = document.getElementById('taskBox')
const saveTasks = document.getElementById('saveTasksBtn')
const loadTasks = document.getElementById('loadTasksBtn')
const deleteAll = document.getElementById('deleteAllTasks')

// App Functions

// Check if Task List is empty

function checkIfEmpty(){

    if(taskBox.childElementCount === 0){

        const headerBox = document.createElement('div')
        headerBox.classList.add('gridItem')

        const idLabel = document.createElement('h1')
        idLabel.innerHTML = '#'
        const nameLabel = document.createElement('h1')
        nameLabel.innerHTML = 'Name'
        const descLabel = document.createElement('h1')
        descLabel.innerHTML = 'Description'
        const delLabel = document.createElement('h1')
        delLabel.innerHTML = 'Delete'

        headerBox.appendChild(idLabel)
        headerBox.appendChild(nameLabel)
        headerBox.appendChild(descLabel)
        headerBox.appendChild(delLabel)

        taskBox.appendChild(headerBox)

    }
}

// Remove Task from List

function deleteTask(event){
    event.target.parentElement.remove()
    updateID()
}

// Set initial Task ID

async function setTaskID(string){

    const taskArray = await taskBox.getElementsByClassName('taskItem')
    return string.innerHTML = taskArray.length

}

// Update Tasks ID when deleting

async function updateID (){
    const taskArray = await taskBox.getElementsByClassName('taskItem')

    for(var i = 0; i < taskArray.length; i++){
        taskArray[i].children[0].innerHTML = i + 1
    }
}

function printLocalData(idArray, nameArray, descArray){

    taskBox.innerHTML = ''
    checkIfEmpty()

    let tasks = idArray.length

    for(var i = 0; i < tasks; i++){

        const taskItem = document.createElement('div')
        taskItem.classList.add('taskItem')
    
        const taskID = document.createElement('p')
        taskID.innerHTML = idArray[i]
        taskID.classList.add('id')
        taskItem.appendChild(taskID)
    
        const taskName = document.createElement('p')
        taskName.innerHTML = nameArray[i]
        taskName.classList.add('name')
        taskItem.appendChild(taskName)
    
        const taskDesc = document.createElement('p')
        taskDesc.innerHTML = descArray[i]
        taskDesc.classList.add('desc')
        taskItem.appendChild(taskDesc)
    
        const taskDel = document.createElement('button')
        taskDel.innerHTML = 'X'
        taskDel.classList.add('del')
        taskDel.addEventListener('click', deleteTask)
        taskItem.appendChild(taskDel)
    
        taskBox.appendChild(taskItem)

    }

}

// Event Listeners

// Save to local storage

saveTasks.addEventListener('click', async () => {

    var idArray = []
    var nameArray = []
    var descArray = []

    const taskArray = await taskBox.getElementsByClassName('taskItem')

    for(var i = 0; i < taskArray.length; i++){
        idArray.push(taskArray[i].children[0].innerHTML)
        nameArray.push(taskArray[i].children[1].innerHTML)
        descArray.push(taskArray[i].children[2].innerHTML)
    }

    // Stringify arrays

    idArray = JSON.stringify(idArray)
    nameArray = JSON.stringify(nameArray)
    descArray = JSON.stringify(descArray)

    // Save to local storage

    localStorage.setItem('tasksID', idArray)
    localStorage.setItem('tasksName', nameArray)
    localStorage.setItem('tasksDesc', descArray)

});

//  Load local data

loadTasks.addEventListener('click', async () => {

    // Retrieve local storage

    const getID = await localStorage.getItem('tasksID')
    const getName = await localStorage.getItem('tasksName')
    const getDesc = await localStorage.getItem('tasksDesc')

    // Converting string to array

    idArray = JSON.parse(getID)
    nameArray = JSON.parse(getName)
    descArray = JSON.parse(getDesc)

    printLocalData(idArray, nameArray, descArray)

})

// Delete all data

deleteAll.addEventListener('click', () => {
    localStorage.clear();
});

// Electron Related

createTaskBtn.addEventListener('click', () => {
    window.electronAPI.createTask()
});


window.electronAPI.printTask((event, data) => {

    checkIfEmpty()

    const taskItem = document.createElement('div')
    taskItem.classList.add('taskItem')

    const taskID = document.createElement('p')
    taskID.innerHTML = setTaskID(taskID)
    taskID.classList.add('id')
    taskItem.appendChild(taskID)

    const taskName = document.createElement('p')
    taskName.innerHTML = data[0]
    taskName.classList.add('name')
    taskItem.appendChild(taskName)

    const taskDesc = document.createElement('p')
    taskDesc.innerHTML = data[1]
    taskDesc.classList.add('desc')
    taskItem.appendChild(taskDesc)

    const taskDel = document.createElement('button')
    taskDel.innerHTML = 'X'
    taskDel.classList.add('del')
    taskDel.addEventListener('click', deleteTask)
    taskItem.appendChild(taskDel)

    taskBox.appendChild(taskItem)

})