const { join } = require('node:path');
const { app, BrowserWindow } = require('electron');
const url = require('node:url');

function createWindow() {
	const mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			nodeIntegration: false,
		},
		width: 800,
	});
	mainWindow.loadURL(
		url.format({
			pathname: join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true,
		}),
	);
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	app.quit();
});
