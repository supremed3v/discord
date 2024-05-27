import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  safeStorage: {
    isEncryptionAvailable: async () => await ipcRenderer.invoke('is-encryption-available'),
    encryptString: async (data) => await ipcRenderer.invoke('encrypt-string', data),
    decryptString: async (encrypted) => await ipcRenderer.invoke('decrypt-string', encrypted),
  },
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
  }
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
