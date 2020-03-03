const { Router } = require('express');
const router = Router();
const user = require('../controllers/user')

const verifyToken = require('../middlewares/verifyToken')

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', user.signup);

router.post('/signin', user.signin);

router.get('/users', verifyToken.verify, user.getAll );

router.post('/users/add', verifyToken.verify, user.add );

router.put('/users/update', verifyToken.verify, user.update );

router.put('/users/delete', verifyToken.verify, user.delete );

module.exports = router;
