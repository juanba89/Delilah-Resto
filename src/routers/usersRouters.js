const { Router } = require('express');
const router = Router();
const { addUser, showUsers } = require('../data/users');
const { isAdmin, logged } = require('../middlewares/validations');

router.post('/', addUser);

router.get('/',logged, isAdmin ,showUsers);



module.exports = router;