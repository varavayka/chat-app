
const messengerHandler = (req, res) => {
    console.log('маршрут авторизации')
    res.send('Вы в мессенджере!')
};

module.exports = messengerHandler;
