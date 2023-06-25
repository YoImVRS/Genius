// Database Configuration
const dbConfig = {
  host: 'localhost',
  port: 3306,
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
};

// Backup Configuration
const backupConfig = {
  backupPath: './backups',
  schedule: '0 0 * * *', // Every day at midnight
};

module.exports = { dbConfig, backupConfig };
