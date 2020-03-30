'use strict'

import { app, BrowserWindow ,ipcMain,Tray,Menu,shell} from 'electron'
let process=require('process')
let mainWindow
let msgsWindow
let downLoadWindow
let popWindow;
let imageWindow;
let dicomWindow
let webContents
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 410,
        useContentSize: true,
        width: 400,
        minHeight:410,
        minWidth:400,
        //transparent:true,
        //此处修改菜单栏是否课件
        frame:true
    })
    mainWindow.loadURL(winURL);
    //mainWindow.webContents.openDevTools()
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}
function  showWindow(windowName) {
    if(windowName&&windowName=='screenShare'){
        popWindow.show();
    }else{
        mainWindow.show();
    }
}
function  minWindow(windowName) {
    console.log('windowName',windowName);
    console.log('windowName==screenShare',windowName=='screenShare');
    if(windowName&&windowName=='screenShare'){
        popWindow.minimize();
    }else{
        mainWindow.minimize();
    }
}
function  maxWindow(windowName) {
    if(windowName&&windowName=='screenShare'){
        popWindow.maximize();
    }else{
        mainWindow.maximize();
    }
    showWindow(windowName)
}
function  closeWindow(windowName) {
    if(windowName&&windowName=='screenShare'){
        popWindow.close();
    }else{
        mainWindow.close();
    }
}
function  openDevTools(windowName) {
    if(windowName&&windowName=='screenShare'){
        popWindow.openDevTools();
    }else{
        mainWindow.openDevTools();
    }
}
function  hideWindow() {
    isHide = true;
    mainWindow.hide();
}

let isHide=false;
/*win.setFullScreen(flag)
 flag Boolean
 设置是否全屏.
 win.isFullScreen()
 返回 boolean, 窗口是否全屏化.*/

var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
    // 当另一个实例运行的时候，这里将会被调用，我们需要激活应用的窗口
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
    return true;
});

// 这个实例是多余的实例，需要退出
if (shouldQuit) {
    app.quit();
}

let tray;
// app.on('login', function(event, webContents, request, authInfo, callback) {
//     event.preventDefault();
//     callback('username', 'secret');
// })
let trayUrl='';
if (process.env.NODE_ENV !== 'development') {
    trayUrl = require('path').join(__dirname, '/static/image/icon-1.png').replace(/\\/g, '\\\\')
}else {
    /* trayUrl ='./././static/image/tray-win.png'*/
    trayUrl = require('path').join(__dirname, '../../static/image/icon-1.png').replace(/\\/g, '\\\\')
}
app.on('ready', function(){
    createWindow();
    tray = new Tray(trayUrl);
    tray.setToolTip('七只企鹅App');
    const menu = Menu.buildFromTemplate([   // 定义右建菜单
        {label: "显示",click: showWindow},
        {label: "最小化",click: minWindow},
        {label: "最大化",click: maxWindow},
        {label: "关闭",click: closeWindow}
    ]);
    tray.setContextMenu(menu);//应用右建菜单
    tray.on('click', function () {
        // if(mainWindow.isMinimized()){
        tray.setImage(trayUrl);
        twinkle = false;
        if(MessageFlag == true){
            clickMessageTray();
            // mainWindow.webContents.send('messageWindow')
        }
        mainWindow.show();
        // }else{
        //     mainWindow.minimize();
        // }

    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})


// 托盘闪烁标识
let twinkle ;
//单击托盘（此时托盘是否闪烁标识）
let MessageFlag;
ipcMain.on('TrayMessage',(event)=>{
    showOnMessageIcon(true,true)
    tray.setToolTip('您有一条新消息，点击查看')
	// console.log('77777777777777');
	event.sender.send('ring')
	// process.stdout.write('\x07')
 //    shell.beep();
})
const showOnMessageIcon =(flag,value)=>{
    twinkle = value;
    setTimeout(function () {
        if (twinkle){
            MessageFlag = true;
            if (flag) {
                flag = false;
                if (process.env.NODE_ENV !== 'development') {
                    tray.setImage(require('path').join(__dirname, '/static/image/touming.png').replace(/\\/g, '\\\\'))
                }else {
                    tray.setImage(require('path').join(__dirname, '../../static/image/touming.png').replace(/\\/g, '\\\\'))
                }
                // tray.setImage(require('path').join(__dirname, '../../static/image/4.png').replace(/\\/g, '\\\\'));
            } else {
                flag = true;
                tray.setImage(trayUrl);
            }
            showOnMessageIcon(flag,twinkle);
        }
    },400);
}

ipcMain.on('createURL-window',(event,arg)=>{
    let parm = JSON.parse(arg);
    downLoadWindow = new BrowserWindow({
        height: 800,
        useContentSize: true,
        width: 600,
        minHeight:700,
        minWidth:400,
        show:false,
        frame:true
    })
    downLoadWindow.loadURL(parm)
    downLoadWindow.on('closed', () => {
        downLoadWindow = null
    })
})

ipcMain.on('createMsg-window',(event,arg1,arg2)=>{
    let parm1 = JSON.parse(arg1);
    let parm2 = JSON.parse(arg2);
    MessageFlag = false;
    tray.setToolTip('七只企鹅App');
    msgsWindow = new BrowserWindow({
        height: 700,
        useContentSize: true,
        width: 400,
        minHeight:700,
        minWidth:400,
        show:true,
        frame:true,
    })
    msgsWindow.loadURL(parm1 + "?accessToken=" + parm2.accessToken +
        "&userid=" + parm2.userid + "&date=" + new Date())
    msgsWindow.on('closed', () => {
        msgsWindow = null
    })
})

ipcMain.on('show-window',(event,arg)=>{
    let parm = JSON.parse(arg);
    popWindow = new BrowserWindow({
        height: 790,
        useContentSize: true,
        width: 1000,
        minHeight:700,
        minWidth:400,
        show:true,
        frame:false
    })

    console.log("show-window",parm.wsurl);
    popWindow.loadURL(parm.wsurl);

    popWindow.on('closed', () => {
        popWindow = null
    })
})
ipcMain.on('image-window',(event,arg)=>{
    let parm = JSON.parse(arg);
    imageWindow = new BrowserWindow({
        height: 440,
        useContentSize: true,
        width: 800,
        minHeight:400,
        minWidth:800,
        show:true,
        icon:trayUrl,
        title:'七只企鹅App',
        frame:true
    })
    // imageWindow.setMenu(null)
    console.log("image-window",parm.imageurl);
    imageWindow.loadURL(parm.imageurl);

    imageWindow.on('closed', () => {
        imageWindow = null
    })
})
ipcMain.on('ehr-window',(event,arg)=>{
    let parm = JSON.parse(arg);
    popWindow = new BrowserWindow({
        height: 600,
        useContentSize: true,
        width: 1000,
        minHeight:600,
        minWidth:800,
        show:true,
        title:'EHRIVIEW',
    })
    // popWindow.setMenu(null)
    console.log("show-window",parm.ehrurl);
    popWindow.loadURL(parm.ehrurl);

    popWindow.on('closed', () => {
        popWindow = null
    })
})
ipcMain.on('down-window',(event,arg)=>{
    let parm = JSON.parse(arg);
    mainWindow.webContents.downloadURL(parm.downloadurl);
    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
       //设置文件存放位置，如果用户没有设置保存路径，Electron将使用默认方式来确定保存路径（通常会提示保存对话框）
     //  item.setSavePath('f:'+"/" )

        console.log(item.getFilename())
        item.on('updated', (event, state) => {
            console.log(state)
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused')
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            console.log(state)
            if (state === 'completed') {
                console.log('Download successfully')
//回显 调用渲染进程方法
                //mainWindow.webContents.send('downstate',state)
            } else {
                console.log(`Download failed: ${state}`)
//回显 调用渲染进程方法
               // mainWindow.webContents.send('downstate',state)
            }
        })
    })
})
ipcMain.on('trayEvent',()=>{
    clickMessageTray();

})
function clickMessageTray(){
    mainWindow.show();
    twinkle = false;
    MessageFlag = false;
    tray.setImage(trayUrl);
    tray.setToolTip('七只企鹅App');
    mainWindow.webContents.send('openPopover');
}

ipcMain.on('window-msg', (event, arg,windowName) => {
    isHide = false;
    let parm = JSON.parse(arg);
    console.log('arg',parm.width);
    if(parm.do=="close"){
        closeWindow(windowName);
    }else if(parm.do=="minimize"){
        minWindow(windowName);
    } else if(parm.do=="maxsize"){
        maxWindow(windowName);
    }else if(parm.do=="openDevTools"){
        openDevTools(windowName);
    }else if(parm.do=="setSize"){
        mainWindow.setSize(parm.width,parm.height);
        // mainWindow.setBounds({x:160,y:80,width: parm.width, height:parm.height});
        mainWindow.center();
    }else if(parm.do=="hide"){
        hideWindow();
    }else if(parm.do=="setMinSize"){
        mainWindow.setMinimumSize(parm.width,parm.height);
        mainWindow.center();
    }
    event.returnValue = 'ok';
    //event.sender.send('asynchronous-reply', 'pong')
})
