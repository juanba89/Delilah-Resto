const yaml = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');


function cargarSwagger(app) {
    try {
        const doc = yaml.load(fs.readFileSync('./spec.yml', 'utf8'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    cargarSwagger
}