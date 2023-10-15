const ws  = require('../../web-socket-server/main')
const rootHandler = (req, res) => {
    ws()
    res.send('root page')
};
    
module.exports = rootHandler;
