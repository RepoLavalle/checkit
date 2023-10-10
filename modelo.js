const fs = require('fs')
const Clases = require('./clases.js');


function testEscritura(){
    fs.writeFileSync('./db/seguridad.txt',JSON.stringify(new Date()))
}

function testLectura(){
    var texto = fs.readFileSync('./db/seguridad.txt','utf-8')
    console.log(texto)
}

//testEscritura()
//testLectura()

//-----------------------------------------------
function guardarObjeto(obj){
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    obj_colObj.push(obj)
    str_colObj = JSON.stringify(obj_colObj)
    fs.writeFileSync('./db/seguridad.txt',str_colObj)
}
function testGuardarObjeto(){
    const miOb = {}
    miOb.nombre = "Enzo"
    miOb.apellido = "Soria"

    guardarObjeto(miOb);   
}
//testGuardarObjeto()

//-----------------------------------------------

function agregarUsuario(obj){
    let str_colObj = fs.readFileSync('./db/usuarios.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    obj_colObj.push(obj)
    str_colObj = JSON.stringify(obj_colObj)
    fs.writeFileSync('./db/usuarios.txt',str_colObj)
}

function testAgregarUsuario(){
    const nU = new Clases.Usuario();
    nU.setNombre("Enzo")
    nU.setApellido("Vonkunoschy");
    nU.setNomUsu("vonku")
    agregarUsuario(nU);
}

//testAgregarUsuario();

function eliminarUsuario(s_nomUsu){

    let str_colObj = fs.readFileSync('./db/usuarios.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    let obj_colObj2 = obj_colObj.filter(x=>x.nomUsu != s_nomUsu)
    str_colObj = JSON.stringify(obj_colObj2)
    fs.writeFileSync('./db/usuarios.txt',str_colObj)    

}

function testEliminarUsuario(){
    testAgregarUsuario()
    eliminarUsuario("Vonku")  
}

//testEliminarUsuario();

//-------------------------------------------------

function agregarSegUsuario(obj){
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    obj_colObj.push(obj)
    str_colObj = JSON.stringify(obj_colObj)
    fs.writeFileSync('./db/seguridad.txt',str_colObj)   

}

function testAgregarSegUsuario(){
    const oSU = new Clases.SegUsuario();
    oSU.setNomUsu("Vonku")
    oSU.setPass("1234")
    oSU.setToken("jkde90t09ijfer")
    oSU.setDateToken(new Date());
    agregarSegUsuario(oSU)
}

//testAgregarSegUsuario();

function eliminarSegUsuario(s_nomUsu){
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    obj_colObj2 = obj_colObj.filter(x=>x.nomUsu != s_nomUsu)
    str_colObj = JSON.stringify(obj_colObj2)
    fs.writeFileSync('./db/seguridad.txt',str_colObj) 
}

eliminarSegUsuario("Profe")


//-----------------------------------------------
/**
 * 
 * @param {nombre de usuaria} nomU
 * return Usuario 
 */
function obtenerUsuario(nomU){
    const rU = new Clases.Usuario();
    rU.setNombre="testNombre"
    rU.setApellido = "testApellido"
    rU.setNomUsu = "testNomUsu"
    console.log(rU.getNomUsu());
    console.log(nomU);
    if(nomU == rU.getNomUsu()){
   
        return rU

    }else{
        return {};
    }
}

function testObtenerUsuario(){
    console.log(obtenerUsuario("testNomUsu"))
}

//testObtenerUsuario();

function nomUsuExiste(s_monUsu){
    //Levanto todos los usuarios de usuarios.txt
    //Filtro por nombre de usuario
    //Si la cuenta del fitrado es uno, devuelvo true
    //Si la cuenta del filtrado es distinto de uno devuelvo false
    return true;
}

function testNomUsuExiste(){
    testAgregarUsuario()
    if(nomUsuExiste("vonku")){
        console.log("test nomUsuExiste(...) Exitoso")
    }else{
        console.log("test nomUsuExiste(...) Falló")
    }
}

//testNomUsuExiste();

module.exports = {agregarUsuario, agregarSegUsuario, nomUsuExiste}