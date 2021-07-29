
//Array de productos

orders = [
    {
        orderId: 1,
        idPayMet: 1,
        userId: 1,
        products: [
            {
                "idProd": 1,
                "name": 'Bagel de salmon',
                "price": 425,
                "amount": 2,
            }
        ],
        totalPrice: 850,
        open: true,
        currentStatus: "Pendiente",
    }];

statusArray = [
    {
        statusId: 1,
        name: "Pendiente"
    },
    {
        statusId: 2,
        name: "Confirmado"
    },
    {
        statusId: 3,
        name: "En preparacion"
    },
    {
        statusId: 4,
        name: "Enviado"
    },
    {
        statusId: 5,
        name: "Entregado"
    }];

// Funciones 

//ATENCION!!! hacer middlewares para que solo pueda hacerlo el admin
function showOrders(req, res) {
    res.status(200).json(orders);
}

function addOrder(req, res) {
    const userId = Number(req.headers.userid);
    const idPayMet = req.body.idPayMet;
    const products = req.body.products;
    const open = true;
    let orderStatus = 1;
    for (const estado of statusArray) {
        if (orderStatus === estado.statusId) {
            currentStatus = estado.name;
        }
    }
    if (idPayMet && products !== null) {
        const orderId = orders.length + 1;
        let totalPrice = 0;
        for (const product of products) {
            const price = Number(product.price);
            const amount = Number(product.amount);
            totalPrice = totalPrice + price * amount;
        }
        const newOrder = { orderId, idPayMet, userId, products, totalPrice, open, currentStatus };
        orders.push(newOrder);
        return res.status(200).json(orders);
    } else {
        res.status(400).send('Los datos ingresados son incorrectos o estan incompletos');
    }
}


function payOrder(req, res) {
    const oId = Number(req.params.orderId);
    if (oId !== null && oId !== undefined) {
        for (const order of orders) {
            if (oId === order.orderId) {
                order.open = false;
                order.currentStatus = "Confirmado";
            }
        } return res.status(200).json(orders);
    } else {
        res.status(400).send('El numero de orden no es correcto');
    }

}

function changeOrderStatus(req, res) {
    const newStatus = Number(req.body.status);
    const oId = Number(req.params.orderId);
    let status = "";
    if (3 <= newStatus && newStatus <= 5) {
        for (const estado of statusArray) {
            if (newStatus === estado.statusId) {
                status = estado.name;
            }
        }
        for (const order of orders) {
            if (oId === Number(order.orderId)) {
                order.currentStatus = status;
                return res.status(200).json(orders);
            }
        }
        return res.status(400).send('El pedido no existe');
    } else {
        res.status(400).send('El numero de estado no es correcto');
    }
}


function showHistory(req, res) {
    const userId = Number(req.headers.userid);
    const history = orders.filter(order => {
        return userId === order.userId;
    });
    return res.status(200).json(history);
}

function editOrder(req, res) {
    const idPayMet = req.body.idPayMet;
    const products = req.body.products;
    const orderId = Number(req.params.orderId);
    if (idPayMet && products) {
        for (const order of orders) {
            if (order.orderId === orderId) {
                order.idPayMet = idPayMet;
                order.products = products;
                return res.status(200).json(orders);
            }
        }
        res.status(404).json('La orden no existe');
    } else {
        return res.status(400).json('Fltan datos');
    }
}


module.exports = {
    showOrders,
    addOrder,
    payOrder,
    changeOrderStatus,
    showHistory,
    editOrder,
    orders
}
