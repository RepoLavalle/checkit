const fs = require('fs')
const Clases = require('./clases.js');
const Seguridad = require('./seguridad.js');


function dameColeccion(col){
    if(col = "usuarios"){
       let txt_col = fs.readFileSync('./db/usuarios.txt','utf-8')

       let obj_col = JSON.parse(txt_col)

       return obj_col
    }
    return null;    
}

function guardarColeccion(col, data){
    if(col = "usuarios"){
        fs.writeFileSync('./db/usuarios.txt',JSON.stringify(data))
    }
}

function guardarUsuarios(data){
    guardarColeccion("usuarios",data)
}

function dameUsuarios(){
    
    let A_usuarios = dameColeccion("usuarios");
 
    let B_usuarios = []
    for(var i=0 ; i<A_usuarios.length ; i++){
        tmp_usuario = Clases.Usuario.fromJSON(A_usuarios[i])

        let B_controles = [];
        if(A_usuarios[i].controles.length > 0){

            for(var j=0 ; j<A_usuarios[i].controles.length ; j++){
                
                B_controles.push(Clases.Control.fromJSON(A_usuarios[i].controles[j]))
            }
    
        }

        tmp_usuario.controles = B_controles
        B_usuarios.push(tmp_usuario)
    }
    console.log("<-r- mod '[{Usuario}]'")
    return B_usuarios
}

//dameUsuarios()

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
    let repetido = obj_colObj.filter(x => x.nomUsu === obj.nomUsu)
    if(repetido.length == 0){
        repetido.length == 0? obj_colObj.push(obj) : null;
        str_colObj = JSON.stringify(obj_colObj)
        fs.writeFileSync('./db/usuarios.txt',str_colObj)
        return true
    }else{
        return false
    }

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
    // console.log("obj_colObj2")
    // console.log(obj_colObj2)
    if(obj_colObj2.length === 1){
        console.log("<-r- mod 'Usuario'")
        let xusuario = Clases.Usuario.fromJSON(obj_colObj2[0])
        //return obj_colObj2[0]
        return xusuario
    }else{
        console.log("<-r- modelo '{}'")
        return {}
    }

}

function obtenerSegUsuario(segU){
    // cu no implementado
    console.log("--> mod 'obtenerSegUsuario(nomU)'")
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    let obj_colObj2 = obj_colObj.filter(x=>x.nomUsu == segU)

    if(obj_colObj2.length == 1){
        console.log("<-r- mod '{SegUsuario}'")
        return obj_colObj2[0]
    }else{
        console.log("<-r- modelo '{}'")
        return {}
    }
}

function nomUsuExiste(data){
    // cu No Implementado
    console.log("--> mod 'nomUsuExiste(s_monUsu)'")
    

    //Levanto todos los SegUsuarios de usuarios.txt
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }

    //Filtro por nombre de usuario y verifico contraseña
    let tmp = obj_colObj.filter(x=>x.nomUsu == data.user && x.pass == data.pass)

    //Si la cuenta del fitrado es uno, devuelvo true
    //Si la cuenta del filtrado es distinto de uno devuelvo false
    if(tmp.length == 1){
        // Actualizo la fecha del token
        for(var i=0  ; i<obj_colObj.length ; i++){
            if(obj_colObj[i].nomUsu == data.user){
                obj_colObj[i].dateToken = new Date();
            }
        }
        //console.log(JSON.stringify(obj_colObj))
        fs.writeFileSync('./db/seguridad.txt',JSON.stringify(obj_colObj)) 
        console.log("<-r- mod 'true'")
        return true;
    }else{
        console.log("<-r- mod 'false'")
        return false;
    }

}

function x_validarUsuario(arg){
    console.log("--> mod 'validarUsuario(arg)'")
    console.log(arg)

    return true
}

function actualizarUsuario(usu){
    //Recupero usuarios de la base de datos
    
    //Recorro el vector hasta encontrar el usuario buscado

    //Reemplazo el usuario en la colección

    //Guardo nuevamente el la colección.

}





module.exports = {guardarUsuarios , dameUsuarios, agregarUsuario, agregarSegUsuario, nomUsuExiste, eliminarUsuario, eliminarSegUsuario, obtenerUsuario, obtenerSegUsuario, dameColeccion, actualizarUsuario}