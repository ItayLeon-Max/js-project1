
collectData = () => {
    const description = document.getElementById('description').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    const index = getNumberOfTasksInLocalStorage()
    return {
        index,
        description,
        date,
        time,
    }
}

generateHTML = (data) => {
    const newHTML = `
        <div class="task">
            <div>
                <img src="assets/images/x.png" onclick="deleteTask(${data.index})" alt="Delete">
            </div>
            <div>${data.description}</div>
            <div>${data.date}</div>
            <div>${data.time}</div>
        </div>
    `
    return newHTML
}

renderHTML = (newHTML) => {
    const tasksContainer = document.getElementById('tasks')
    tasksContainer.innerHTML += newHTML
}

clearForm = () => {
    const tasksForm = document.getElementById('tasksForm')
    tasksForm.reset()
    const descriptionInput = document.getElementById('description')
    descriptionInput.focus()
}

saveTaskToStorage = (taskObject) => {
    let currentTasksInStorage = JSON.parse(localStorage.getItem('tasks')) || []
    currentTasksInStorage.push(taskObject)
    localStorage.setItem('tasks', JSON.stringify(currentTasksInStorage))
}

loadTasksFromLocalStorage = () => {
    const tasksJSON = localStorage.getItem('tasks')
    const tasksContainer = document.getElementById('tasks')
    tasksContainer.innerHTML = ''
    if (tasksJSON) {
        const tasks = JSON.parse(tasksJSON)
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p>No tasks available. Add some tasks!</p>'
        } else {
            for (const task of tasks) {
                const newHTML = generateHTML(task)
                renderHTML(newHTML)
            }
        }
    } else {
        tasksContainer.innerHTML = '<p>No tasks available. Add some tasks!</p>'
    }
}

initStorage = () => {
    const currentTasksInStorageJSON = localStorage.getItem('tasks')
    if (!currentTasksInStorageJSON) {
        localStorage.setItem('tasks', JSON.stringify([]))
    }
}

getNumberOfTasksInLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    return tasks.length
}

addTask = (event) => {
    event.preventDefault()
    const data = collectData()
    const newHTML = generateHTML(data)
    renderHTML(newHTML)
    saveTaskToStorage(data)
    clearForm()
}

deleteTask = (index) => {
    let currentTasksInStorage = JSON.parse(localStorage.getItem('tasks')) || []
    const updatedTasks = currentTasksInStorage.filter((_, i) => i !== index)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    loadTasksFromLocalStorage() 
}

initStorage()
loadTasksFromLocalStorage()
