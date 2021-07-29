const { Router } = require('express');
const { login } = require('../data/users');
const router = Router();

router.post('/', login);


module.exports = router;
