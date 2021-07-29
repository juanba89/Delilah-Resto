const { Router } = require('express');
const { showPayMets, addPayMets, deletePayMets, editPayMets } = require('../data/paymentMethods');
const { isAdmin, logged } = require('../middlewares/validations');
const router = Router();


router.get('/',logged, showPayMets);

// ATENCION!!!!!!  insertar un middleware que solo permita que los ejecute un admin
router.post('/', logged, isAdmin, addPayMets);

router.delete('/:idPayMet',logged, isAdmin, deletePayMets);

router.put('/:idPayMet',logged, isAdmin, editPayMets);



module.exports = router;