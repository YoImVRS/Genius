const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { exec } = require('child_process');
const { dbConfig, backupConfig } = require('./config');

const { host, port, username, password, database } = dbConfig;
const { backupPath, schedule } = backupConfig;

const performBackup = () => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const backupFileName = `${database}_${timestamp}.sql`;
  const backupFilePath = path.join(backupPath, backupFileName);
  const command = `mysqldump --host=${host} --port=${port} --user=${username} --password=${password} ${database} > ${backupFilePath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup failed: ${error.message}`);
    } else {
      console.log(`Backup created: ${backupFileName}`);
    }
  });
};

cron.schedule(schedule, () => {
  console.log('Performing database backup...');
  performBackup();
});

if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath);
}

console.log('Genius is running and scheduled for automatic backups.');
