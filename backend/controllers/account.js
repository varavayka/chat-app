const accountHandler = (req, res) => {
    res.status(301).redirect('/messenger')
};

module.exports = accountHandler;
