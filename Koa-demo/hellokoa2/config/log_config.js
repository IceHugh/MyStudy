const path = require('path');

const baseLogPath = path.resolve(__dirname, '../logs');

const defaultPath = '/default';
const defaultFileName = 'default';
const defaultLogPath = baseLogPath + defaultPath + '/' + defaultFileName;

const errorPath = '/error';
const errorFileName = 'error';
const errorLogPath = baseLogPath + errorPath + '/' + errorFileName;

const responsePath = '/response';
const responseFileName = 'response';
const responseLogPath = baseLogPath + responsePath + '/' + responseFileName;

module.exports = {
  appenders: {
    out: {
      type: 'console',
    },
    default: {
      "type": "dateFile",
      "filename": defaultLogPath,
      "alwaysIncludePattern": true,
      "pattern": '-yyyy-MM-dd-hh.log',
      "path": defaultPath,
    },
    error: {
      "type": "dateFile",
      "filename": errorLogPath,
      "alwaysIncludePattern": true,
      "pattern": '-yyyy-MM-dd-hh.log',
      "path": errorPath,
    },
    response: {
      "type": "dateFile",
      "filename": responseLogPath,
      "alwaysIncludePattern": true,
      "pattern": '-yyyy-MM-dd-hh.log',
      "path": responsePath,
    }
  },
  categories: {
    default: {
      appenders: ['out','default'],
      level: 'info'
    },
    errorLogger: {
      appenders: ['error'],
      level: 'ERROR',
    },
    responseLogger: {
      appenders: ['response'],
      level: 'info',
    }
  },
  "baseLogPath": baseLogPath
}