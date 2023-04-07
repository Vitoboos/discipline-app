const { contextBridge, ipcRenderer } = require('electron')

// Create task window

contextBridge.exposeInMainWorld('electronAPI', {
    // Create task window
    createTask: () => ipcRenderer.send('create-window'),

    // Print data in main window
    printTask: (data) => ipcRenderer.on('print-task', data, () => {
        console.log('printing from task window preload')
    })
})




