module.exports = {
  appenders: {
    info: {
      type: 'dateFile',
      filename: './logs/log_info/',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m',
      },
    },
    error: {
      type: 'dateFile',
      filename: './logs/log_error/',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['info'],
      level: 'info',
    },
    info: {
      appenders: ['info'],
      level: 'info',
    },
    error: {
      appenders: ['info', 'error'],
      level: 'error',
    },
  },
};
