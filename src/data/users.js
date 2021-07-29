

/*array de usuarios*/
const users = [
    {
        "id": 1,
        "userName": "Admin",
        "fullName": "Admin Admin",
        "email": "admin@gmail.com",
        "phone": "1111111",
        "adress": "Casa del admin",
        "password": "admin123",
        "admin": true,
        "logged": false,
    },
    {
        "id": 2,
        "userName": "pepe",
        "fullName": "pepe perez",
        "email": "pepe@gmail.com",
        "phone": "12121212",
        "adress": "casadepepe 123",
        "password": "pepe123",
        "admin": false,
        "logged": false
    }
];

// Funcion para crear un usuario nuevo
function showUsers(req,res) {
    res.status(200).json(users);
}

function addUser(req, res) {
    const { userName, fullName, email, phone, adress, password } = req.body;

    if (userName && fullName && email && phone && adress && password) {
        const userId = users.length + 1;
        const admin = false;
        const logged = false;
        const newUser = { userId, ...req.body, admin, logged };
        users.push(newUser);
        res.status(200).json(users);
    } else {
        res.status(400).send('falta un dato');
    }
}

//Login
function login(req,res) {
    const {userName,password}= req.body;
    if (userName && password) {  
        for (const user of users) {
            if (userName === user.userName && password === user.password) {
                user.logged=true;
                return res.status(200).send('Logeado exitosamente');
            }
        }
        res.status(404).send('Usuario o Password incorrectos');
    } else {
        res.status(400).send('Hay campos sin completar');
    }
}

module.exports = {
    addUser,
    showUsers,
    login,
    users
}