module.exports = function (router, dbDashboard, token) {

    router.get('/', (req, res, next) => {
        res.json({ status: 'OK' });
    });

}