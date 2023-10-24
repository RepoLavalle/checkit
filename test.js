const Clases = require('./clases.js');
const Modelo = require('./modelo.js');

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

Clases.testUsuario();
Clases.testSegUsuario();
Clases.testTokUsu();




