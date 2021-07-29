
//Array metodos de pago
const payMets=[
    {
        idPayMet:1,
        type: "efectivo",
        working: true
    },
    {
        idPayMet:2,
        type: "Visa Credito",
        working: true
        },
    {
        idPayMet:3,
        type: "Visa Debito",
        working: true
    },
    {
        idPayMet:4,
        type: "Mastercard Credito",
        working: true
    },
    {
        idPayMet:5,
        type: "Mercado Pago",
        working: true
    },
]


// Funciones
function showPayMets(req, res) {
    res.status(200).json(payMets);
}


//ATENCION!!! hacer middlewares para que solo pueda hacerlo el admin
function addPayMets(req,res) {
    const { type , working } = req.body;
    if (type && working) {
        const payMetId = payMets.length + 1;
        const newPayMet = { payMetId, ...req.body };
        payMets.push(newPayMet);
        res.status(200).json(payMets);
    } else {
        res.status(400).send('Falta completar un campo');
    }
}

function deletePayMets(req, res) {
    if (req.params.idPayMet !== null && req.params.idPayMet !== undefined) {
        const idPayMet = Number(req.params.idPayMet);
        for (const payMet of payMets) {
            if (payMet.idPayMet === idPayMet) {
                payMets.splice(payMets.indexOf(payMet), 1);
                return res.status(200).json(payMets);
            }
        }
        return res.status(404).send('No existe el metodo de pago que desea eliminar');
    }
}

function editPayMets(req, res) {
    if (req.params.idPayMet !== null && req.params.idPayMet !== undefined) {
        const idPayMet = Number(req.params.idPayMet);
        const { working } = req.body;
        if (working===true || working===false) {
            for (const payMet of payMets) {
                if (payMet.idPayMet === idPayMet) {
                    payMet.working = working;
                }
            }
            return res.status(200).json(payMets);
        } else {
            res.status(400).send('El valor para working debe ser booleano');
        }
    } 
}


module.exports = {
    showPayMets,
    addPayMets,
    deletePayMets,
    editPayMets
}