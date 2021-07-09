
const express = require('express');
const { cargarSwagger } = require('./middlewares/documentation');
const app = express();

const port = 3000


function main() {

    const app = express();
    app.use(express.json());
    cargarSwagger(app);
  


    app.listen(port, () => console.log(`El servidor esta funcionando!`)
    )}

main();


