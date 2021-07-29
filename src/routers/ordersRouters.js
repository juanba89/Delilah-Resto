const { Router } = require('express');
const { showOrders, addOrder, payOrder, changeOrderStatus, showHistory, editOrder } = require('../data/orders');
const { isAdmin, logged, openOrder } = require('../middlewares/validations');
const router = Router();


//ATENCION!!! hacer un middleware que me diga si es un usuario registrado
router.get('/',logged, isAdmin, showOrders);
router.get('/history',logged, showHistory);

router.post('/',logged, addOrder);

router.put('/:orderId', logged, payOrder);
router.put('/status/:orderId', logged, isAdmin, changeOrderStatus);
router.put('/editOrder/:orderId', logged, openOrder, editOrder);




module.exports = router;