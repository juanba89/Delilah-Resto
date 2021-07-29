const { Router } = require('express');
const router = Router();
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');


function cargarSwagger(router) {
    try {
        const doc = yaml.load(fs.readFileSync('./spec.yml', 'utf8'));
        router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    cargarSwagger
}