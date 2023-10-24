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

//-----------------------------------------------
/**
 * 
 * @param {nombre de usuaria} nomU
 * return Usuario 
 */
function obtenerUsuario(nomU){
     
    console.log("--> mod 'obtenerUsuario(nomU)'")
    /* console.log("<-- No Implementado !!! --[modelo]")
    const rU = new Clases.Usuario();
    rU.setNombre("testNombre")
    rU.setApellido("testApellido")
    rU.setNomUsu("vonku")*/

    let str_colObj = fs.readFileSync('./db/usuarios.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    let obj_colObj2 = obj_colObj.filter(x=>x.nomUsu == nomU)
    console.log("obj_colObj2")
    console.log(obj_colObj2)
    if(obj_colObj2.length === 1){
        console.log("<-r- modelo 'Usuario'")
        return obj_colObj2[0]
    }else{
        console.log("<-r- modelo '{}'")
        return {}
    }

}

function obtenerSegUsuario(segU){
    // cu no implementado
    console.log("--obtenerSegUsuario(nomU)-->[modelo]")
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    let obj_colObj2 = obj_colObj.filter(x=>x.nomUsu == segU)

    if(obj_colObj2.length == 1){
        console.log("<-r- modelo 'SegUsuario'")
        return obj_colObj2[0]
    }else{
        console.log("<-r- modelo '{}'")
        return {}
    }
}

function nomUsuExiste(data){
    // cu No Implementado
    console.log("--nomUsuExiste(s_monUsu)-->[modelo]")
    

    //Levanto todos los SegUsuarios de usuarios.txt
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
        console.log("[Modelo] objetos leìdos y parsedados")
        console.log(obj_colObj)
    }

    //Filtro por nombre de usuario
    let tmp = obj_colObj.filter(x=>x.nomUsu == data.user && x.pass == data.pass)
    console.log("Objetos filtrados por usuario y contraseña")
    console.log(tmp)

    //Si la cuenta del fitrado es uno, devuelvo true
    //Si la cuenta del filtrado es distinto de uno devuelvo false
    
    if(tmp.length == 1){
        console.log("<-r- mod 'true'")
        return true;
    }else{
        console.log("<-r- mod 'false'")
        return false;
    }

}

function validarUsuario(arg){
    console.log("--> mod 'validarUsuario(arg)'")
    console.log(arg)

    return true
}





module.exports = {agregarUsuario, agregarSegUsuario, nomUsuExiste, eliminarUsuario, eliminarSegUsuario, obtenerUsuario, obtenerSegUsuario}