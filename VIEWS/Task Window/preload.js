console.log('reporting preload in task window.')

// Send Data Task data to Main Window

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addTask: (data) => ipcRenderer.send('add-task', data),
    noName: () => ipcRenderer.send('no-name')
})