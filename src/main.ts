import { app, BrowserWindow, dialog } from 'electron';
import * as path from "path";
let win : BrowserWindow = null;

let showExitPrompt = true;
function createWindow(){
    win = new BrowserWindow({
        show: false,
        darkTheme: true,
        fullscreen: true
    });
    win.loadFile(path.join(__dirname,"../index.html"));
    win.on('ready-to-show', () => win.show());
    win.on('close', (e) => {
        if(showExitPrompt){
        e.preventDefault();
        dialog.showMessageBox(null,{
            buttons: ['Ok', 'cancel'],
            type: 'question',
            message: 'Close Window?',
            title: 'confirm'
        },(re,check) => {
            if(re === 0) {
                showExitPrompt = false;
                win.close();
            }
        })
    }
    })
    win.on('closed', () => { 
        
        win = null
    });
}
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
})
app.on('ready',createWindow);