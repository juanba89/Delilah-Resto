const { orders } = require("../data/orders");
const { users } = require("../data/users");


function isAdmin(req, res, next) {
    const id = Number(req.headers.userid);
    for (const user of users) {
        if (id === user.id) {
            if (user.admin === true) {
                return next();
            } else {
                return res.status(403).json('El usuario no es administrador');
            }
        }
    }
    return res.status(404).json('el usuario no existe');
}

function logged(req, res, next) {
    const id = Number(req.headers.userid);
    for (const user of users) {
        if (id === user.id) {
            if (user.logged === true) {
                return next();
            }
            return res.status(401).json('El usuario no se encuentra loggeado');
        }
    }
    res.status(404).json('el usuario no existe');
}

function openOrder(req, res, next) {
    const orderId = Number(req.params.orderId);
    for (const order of orders) {
        if (orderId === order.orderId) {
            if (order.open === true) {
                return next();
            } else {
                return res.status(406).json('El pedido ya está cerrado');
            }
        }
    }
    return res.status(404).json('El pedido no existe');
}


module.exports = {
    isAdmin,
    logged,
    openOrder
}