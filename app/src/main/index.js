'use strict'

import { app, BrowserWindow ,ipcMain,Tray,Menu,shell} from 'electron'
const path=require('path')
let process=require('process')
let mainWindow
let msgsWindow
let downLoadWindow
let popWindow
let imageWindow
let dicomWindow
let webContents
let tray

let maxFlag=false,minFlag=false
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 550,
        useContentSize: true,
        width: 1000,
        minHeight:550,
        minWidth:800,
        //transparent:true,
        //此处修改菜单栏是否课件
        //采用自定义标题栏，关闭默认标题
        frame:false
    })
    mainWindow.webContents.closeDevTools()
    Menu.setApplicationMenu(null)
    let trayMenu=Menu.buildFromTemplate([
        {label:'关闭',click:()=>{}},
    ])
    tray=new Tray(path.resolve(__dirname,'../img/icon.png'))
    tray.setContextMenu(trayMenu)
    tray.setToolTip('七只企鹅\n桌面端')
    mainWindow.loadURL(winURL);
    //mainWindow.webContents.openDevTools()
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    tray.on('click',function(){
        mainWindow.show()
    })
}
app.on('ready',function(){
    createWindow();
})
ipcMain.on('windowMin',function(){
    mainWindow.minimize()
})
ipcMain.on('windowMax',function(){
    if(maxFlag){
        maxFlag=false
        mainWindow.setSize(1000,550)
    }
    else{
        maxFlag=true
        mainWindow.maximize()
    }
    
})
ipcMain.on('windowClose',function(){
    mainWindow.close()
})