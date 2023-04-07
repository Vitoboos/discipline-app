const {app, BrowserWindow, Menu, ipcMain} = require("electron")
const path = require('path')

// Create Main Window

function createWindow () {

    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "./views/main window/preload.js")
        }
    })

// IPC Listeners

// Create Task Window

ipcMain.on('create-window', () => {
        const taskWin = new BrowserWindow({
            width: 600,
            height: 400,
            webPreferences:{
                preload: path.join(__dirname, "./views/task window/preload.js")
            }
        });
        taskWin.loadFile("./views/task window/taskWindow.html")

        // Show notification

        ipcMain.on('no-name', () => {
            console.log('xd')
            const alert = new BrowserWindow({ width: 200, height: 200 ,parent: taskWin, modal: true, show: false })
            alert.loadFile("./views/task window/noName.html")
            alert.show()
        })
    })

// Add Task to Main Window

    ipcMain.on('add-task', (event, data) => {
        mainWindow.webContents.send('print-task', data)
    })


// Load Main File

    mainWindow.loadFile("./views/main window/main.html")

// Close

    mainWindow.on('closed', () => app.quit())

}

app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    })

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })
