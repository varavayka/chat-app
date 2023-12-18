const messageDate = (fromParams, toParams) => `${new Date(Date.now())}`.split(' ').slice(fromParams,toParams).join(' ')
module.exports = messageDate