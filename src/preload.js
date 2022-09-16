const { contextBridge, ipcRenderer } = require('electron')

contextBridge. xposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => proceso. ersions.chrome,
  electron: () => process.versions.electron,
})