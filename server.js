const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
//const Seguridad = require('./seguridad/seguridad.js');

const Seguridad = require('./seguridad.js');

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
    //res.send("<h1>Checkit free.... ! </p>");
    res.render('login',{});
});

app.post('/login',(req, res)=>{
    console.log(" web --> ser 'post/login'");
    //console.log(JSON.stringify(req.body));
    if(req.body.cu00 == "Nuevo"){
        console.log("web <-r- ser 'registro'")
        res.render('registro',{});  
    }
    if(req.body.cu00 == "Ingresar"){
        let valUsu = Seguridad.validarUsuario(req.body)
        console.log("ser --> seg 'validarUsuario(req.body)'")

        if(valUsu.validar){
            let contenido = JSON.stringify(valUsu.carga)
            console.log("web <-r- ser 'menu.html'")
            res.render('menu',{contenido, valUsu});            
        }else{
            console.log("nav <-r- server 'falla.html'")
            res.render('falla',{}); 
        }

    }

});

app.post('/registro', (req, res) => {

    console.log("web --> ser 'post/registro'")
    let rta = Seguridad.regUsu(req.body);
    console.log("web <-r- ser 'exito/falla'")
    rta ? res.render('exito',{}) : res.render('falla',{});
});


app.post('/menu', (req, res) => {
    console.log("web --> ser 'post/menu'")
    const nombre = new Date(); // Puedes pasar datos dinámicos a la vista
    // creo un objeto
    //res.render('index', { nombre: nombre, comida: plato });
    //res.send("<h1>Checkit free.... ! </p>");
    console.log("web <-r- ser 'menu.html'")
    res.render('menu',{});
});

// cu 01 
app.post('/mercaderia',(req, res)=>{
    console.log(new Date()+"---------------------------------------------------------------------");
    console.log("--/mercaderia-POST-->[server.js]");
    console.log(JSON.stringify(req.body));
})

// cu10 nuevo Control
app.post('/api',(req,res)=>{
    
    console.log("web --> ser 'post/api'")
    res.send(Seguridad.procesar(req.body));
    console.log("web <-r- ser '[{..}]'")
})




app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000   -----------------------------------');
});