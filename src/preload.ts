import {ipcRenderer, contextBridge} from "electron"

// This setup is taken from Electron React Boilerplate webpage | Advanced -> Electron Store
contextBridge.exposeInMainWorld('electron', {
    store: {
        get(key:string) {
            return ipcRenderer.sendSync('electron-store-get', key);
        },
        set(key:string, payload:any) {
            ipcRenderer.send('electron-store-set', key, payload);
        },
        clear(){
            ipcRenderer.send('electron-store-clear')
        }
        // Other method you want to add like has(), reset(), etc.
    },
    signal: {
        redirect_to_diva(){
            ipcRenderer.send('redirect-to-diva')
        },
        redirect_to_menu(){
            ipcRenderer.send('redirect-to-menu')
        },
        set_fullscreen(flag:boolean){
            ipcRenderer.send("set-fullscreen", flag)
        }
    }
    // Any other methods you want to expose in the window object.
    // ...
});