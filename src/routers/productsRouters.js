const { Router } = require('express');
const router = Router();
const { showProducts, addProducts, editProducts, deleteProducts } = require('../data/products');
const { isAdmin, logged } = require('../middlewares/validations');
 
    
router.get('/', showProducts);

// ATENCION!!!!!!  insertar un middleware que solo permita que los ejecute un admin
router.post('/',logged, isAdmin, addProducts);
router.delete('/:idProd',logged, isAdmin, deleteProducts);
router.put('/:idProd',logged, isAdmin, editProducts);



module.exports = router;