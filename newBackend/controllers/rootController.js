function rootController(req,res) {
    console.log(req)
    res.status(200).send('Корневой маршрут (начальная страница)')
}

module.exports = rootController