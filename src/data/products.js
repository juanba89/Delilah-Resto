
//Array de productos
const products = [
    {
        'idProduct': 1,
        'name': 'Bagel de salmon',
        'price': 425
    },
    {
        'idProduct': 2,
        'name': 'Hamburguesa clasica',
        'price': 350
    },
    {
        'idProduct': 3,
        'name': 'Sandwich veggie',
        'price': 310
    },
    {
        'idProduct': 4,
        'name': 'Ensalada Veggie',
        'price': 340
    }
];

//Funciones 

function showProducts(req, res) {
    res.status(200).json(products);
}

function addProducts(req, res) {
    const { name, price } = req.body;
    if (name && price) {
        const productId = products.length + 1;
        const newProduct = { productId, ...req.body };
        products.push(newProduct);
        res.status(200).json(products);
    } else {
        res.status(400).send('Falta completar un campo');
    }

}

function deleteProducts(req, res) {
    if (req.params.idProd !== null && req.params.idProd !== undefined) {
        const idProd = Number(req.params.idProd);
        for (const product of products) {
            if (product.idProduct === idProd) {
                products.splice(products.indexOf(product), 1);
                return res.status(200).json(products);
            }
        }
        return res.status(404).send('No existe el producto');
    }
}

function editProducts(req, res) {
    if (req.params.idProd !== null && req.params.idProd !== undefined) {
        const idProd = Number(req.params.idProd);
        const { name, price } = req.body;
        if (name && price) {
            for (const product of products) {
                if (product.idProduct === idProd) {
                    product.name = name;
                    product.price = price;
                }
            }
            return res.status(200).json(products);
        } else {
            res.status(400).send('falta un dato');
        }
    } 
}

module.exports = {
    showProducts,
    addProducts,
    deleteProducts,
    editProducts

}