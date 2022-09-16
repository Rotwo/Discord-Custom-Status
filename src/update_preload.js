const electron = require('electron')
const ipc = electron.ipcRenderer

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('updateClick').addEventListener("click", function () {
        const reply = ipc.sendSync('update-event', true)
    });
})