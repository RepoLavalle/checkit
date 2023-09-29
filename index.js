const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
//const Seguridad = require('./seguridad/seguridad.js');

// Establece EJS como el motor de plantillas predeterminado
app.set('view engine', 'ejs');

// Especifica la ubicación de las vistas (plantillas EJS)
app.set('views', path.join(__dirname, 'views'));

// Configura el middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

    var plato = {};
    plato.nombre = "Papas fritas";
    plato.precio = 100;

let estaUrl = path.join(__dirname);
var _url = "";
if(estaUrl[0] == "C" && estaUrl[1] == ":"){
    _url = "http://localhost:3000";
}else{
    _url = "https://railway2-production-725e.up.railway.app";
}

app.get('/', (req, res) => {
    const nombre = new Date(); // Puedes pasar datos dinámicos a la vista
    // creo un objeto
    //res.render('index', { nombre: nombre, comida: plato });
    res.send("<h1>Checkit free.... ! </p>");
});

app.post('/',(req, res)=>{
    console.log(JSON.stringify(req.body));
    var carga = req.body;
    var AA = Seguridad.autenticar(carga);
    AA[1].url = _url;
    //res.send(JSON.stringify(AA));
    //res.send(JSON.stringify(req.body));
    var nombre = "Ravioles a la Bolognesa";
    var plato = "$ 1.000,00";
    if(AA[0]){
        res.render(AA[1].rol, actor = AA[1]);    
    }else{
        res.render('index',{ nombre: nombre, comida: plato })
    }
    
});
// cu 01 
app.post('/mercaderia',(req, res)=>{
    console.log(new Date()+"---------------------------------------------------------------------");
    console.log("--/mercaderia-POST-->[server.js]");
    console.log(JSON.stringify(req.body));

    let respuesta = Seguridad.procesar(req.body);// ----->
    
    const oveja = {};
    oveja.nombre = "doly";
    oveja.edad = 12;
    //res.status(200).send(JSON.stringify(oveja));
    res.status(200).send(respuesta);
})






app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});