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

//   Clase Usuario ---------------------------------
function testUsuario(){
    const testUsu = new Clases.Usuario();
    testUsu.nombre = "testNombre"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"
    console.log(testUsu);
    const testUsuStr = JSON.stringify(testUsu)
    console.log(testUsuStr)
    const recuTestUsu = Clases.Usuario.fromJSON(JSON.parse(testUsuStr));
    console.log(recuTestUsu);
    console.log(recuTestUsu.getNombre());
    console.log(recuTestUsu.getApellido());
    console.log(recuTestUsu.getNomUsu());
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




