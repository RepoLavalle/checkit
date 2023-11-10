const Clases = require('./clases.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js');
const fs = require('fs')



//  agregarUsuario-----------------------------------
function testAgregarUsuario(){
    const nU = new Clases.Usuario();
    nU.setNombre("Enzo")
    nU.setApellido("Vonkunoschy");
    nU.setNomUsu("vonku")
    Modelo.agregarUsuario(nU);
}
testAgregarUsuario();

//  agregarSegUsuario-------------------------------
function testAgregarSegUsuario(){
    const oSU = new Clases.SegUsuario();
    oSU.setNomUsu("vonku")
    oSU.setPass("1234")
    oSU.setToken("jkde90t09ijfer")
    oSU.setDateToken(new Date());
    Modelo.agregarSegUsuario(oSU)
}
testAgregarSegUsuario();

//  nomUsuExiste------------------------------------
function testNomUsuExiste(){
    testAgregarUsuario()
    if(Modelo.nomUsuExiste("vonku")){
        console.log("test nomUsuExiste(...) Exitoso")
    }else{
        console.log("test nomUsuExiste(...) Falló")
    }
    //Modelo.eliminarUsuario("vonku");
}
testNomUsuExiste();

//   obtenerUsuario---------------------------------
function testObtenerUsuario(){
    console.log(Modelo.obtenerUsuario("vonku"))
}
testObtenerUsuario();

//  obtenerSegUsuario-------------------------------
function testObtenerSegUsuario(){
    console.log(Modelo.obtenerSegUsuario("vonku"))
}
testObtenerSegUsuario();

//   eliminarUsuario---------------------------------
function testEliminarUsuario(){
    testAgregarUsuario()
    Modelo.eliminarUsuario("vonku")  
}
testEliminarUsuario();

//   eliminarSegUsuario-----------------------------
function testEliminarSegUsuario(){
    Modelo.eliminarSegUsuario("Profe")
}
testEliminarSegUsuario()

//   Clase Usuario ---------------------------------
function testUsuario(){
    console.log("testUsuario----------------------------------------")
    const testUsu = new Clases.Usuario();
    testUsu.nombre = "testNombre"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"
 
    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));

    testUsu.agregarControl(unControl);
    console.log(testUsu)

    

    console.log("fin-----------------------------------------------")
}
testUsuario();

//  Clase SegUsuario ------------------------------
function testSegUsuario(){
    const oSU = new Clases.SegUsuario("Enzo","1234");
    oSU.setToken("39mv0nct89u98mwc8cctmw")
    oSU.setDateToken(new Date());
    console.log(oSU);
}
testSegUsuario();

function testTokUsu(){
    const testUsu = new Clases.Usuario();
    testUsu.nombre = "testNombre"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"

    const oSU = new Clases.SegUsuario("Enzo","1234");
    oSU.setToken("39mv0nct89u98mwc8cctmw")
    oSU.setDateToken(new Date());

    const miTokUsu = new Clases.TokUsu(testUsu, oSU);
    console.log(miTokUsu);
}
testTokUsu();

function testDameColeccion(){
    console.log("testDameColeccion----------------------")
    console.log(Modelo.dameColeccion("usuarios"));
    let colUsu = Modelo.dameColeccion("usuarios");
    console.log(colUsu);
    console.log("fin-----------------------------------")    
}
testDameColeccion();

function testProcesar(){
    console.log("test.js testProcesar()-----------------")
    Controlador.procesar();
    console.log("Fin-----------------------------")

}
testProcesar();

function testControl(){
    console.log("testControl----------------------------")
    
    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));

    const recControl = JSON.parse(JSON.stringify(unControl))

    const obRecControl = Clases.Control.fromJSON(recControl);

    console.log(unControl[Object.keys(unControl)[0]] === obRecControl[Object.keys(obRecControl)[0]])
    console.log(unControl[Object.keys(unControl)[1]] === obRecControl[Object.keys(obRecControl)[1]])
    console.log(unControl[Object.keys(unControl)[2]] === obRecControl[Object.keys(obRecControl)[2]])
    console.log(unControl[Object.keys(unControl)[3]] === obRecControl[Object.keys(obRecControl)[3]])
    console.log(unControl[Object.keys(unControl)[4]].getTime() === obRecControl[Object.keys(obRecControl)[4]].getTime())
    console.log(unControl[Object.keys(unControl)[5]] === obRecControl[Object.keys(obRecControl)[5]]) 

}
testControl();


function testAgregarUsuario(){

    // Instancio un usuario   
    const usu = new Clases.Usuario();
    usu.setApellido("testApellido2")
    usu.setNomUsu("testNomUsu2")
    usu.setNombre("testNombre2")

    Modelo.agregarUsuario(usu);

}
testAgregarUsuario()


