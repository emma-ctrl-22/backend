const { format } = require('date-fns');
const {v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;
  const logMessage = `${dateTime}\t${uuid}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '../logs'))) {
      fs.mkdirSync(path.join(__dirname, '../logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '../logs/events.log'), logMessage);
  } catch (error) {
   console.log('Error writing to log file', error); 
  }
}