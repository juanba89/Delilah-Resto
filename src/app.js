

const express = require('express');
const { cargarSwagger } = require('./middlewares/documentation');
const productsRouters = require('./routers/productsRouters');
const usersRouters = require('./routers/usersRouters');
const loginRouters = require('./routers/loginRouters');
const paymentMethodsRouters = require('./routers/paymentMethodsRouters');
const ordersRouters = require('./routers/ordersRouters');
const { logged } = require('./middlewares/validations');

const port = 3030


function main() {

    const app = express();
    app.set('json spaces', 2);
    app.use(express.json());
    
    //DOCUMENTACION SWAGGER
    cargarSwagger(app);
    
    //LOGIN
    app.use('/api/v1/login', loginRouters);
    
    //USUARIOS
    app.use('/api/v1/users', usersRouters);
    
    //PRODUCTOS
    app.use('/api/v1/products', productsRouters); 

    //PEDIDOS
    app.use('/api/v1/orders', ordersRouters); 

    //METODOS DE PAGO
    app.use('/api/v1/paymentMethods', paymentMethodsRouters); 


    // Iniciando el servidor
    app.listen(port, () => 
        console.log(`El servidor esta funcionando!`)
    )
    }

main();


