const fs = require('fs')
const Clases = require('./clases.js');
const Seguridad = require('./seguridad.js');


function dameColeccion(col){
    if(col == "usuarios"){
       let txt_col = fs.readFileSync('./db/usuarios.txt','utf-8')
       let obj_col = JSON.parse(txt_col)
       return obj_col
    }

    if(col == "listas"){
        let txt_col = fs.readFileSync("./db/listas.txt", 'utf-8')
 
        let obj_col = []
        if(txt_col){
            obj_col = JSON.parse(txt_col);
        }
 
        return obj_col
    }

    return null;    
}

function guardarColeccion(col, data){
    if(col == "usuarios"){
        fs.writeFileSync('./db/usuarios.txt',JSON.stringify(data))
    }
    if(col == "listas"){
        fs.writeFileSync("./db/listas.txt",JSON.stringify(data))
    }
}

function guardarListas(data){
    guardarColeccion("listas",data)
}

function dameListas(){
    // Obtengo las listas de la unidad o de la base de datos
    let obj_js_listas  = dameColeccion("listas")

    //convierto en objetos Lista
    let obj_lis_listas = []
    if(obj_js_listas.length > 0){
        for(var i=0 ; i<obj_js_listas.length ; i++){
            obj_lis_listas.push(Clases.Lista.fromJSON(obj_js_listas[i]))
        }
    }
    //Entrego la colección
    return obj_lis_listas
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
 
    let str_colObj = fs.readFileSync('./db/usuarios.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
 
    let obj_colObj2 = obj_colObj.filter(x=>x.nomUsu == nomU)
 
    if(obj_colObj2.length === 1){
        
        let xusuario = Clases.Usuario.fromJSON(obj_colObj2[0])
        //return obj_colObj2[0]
        return xusuario
    }else{
        
        return {}
    }

}

function obtenerSegUsuario(segU){
 
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
    }
    let obj_colObj2 = obj_colObj.filter(x=>x.nomUsu == segU)

    if(obj_colObj2.length == 1){
        return obj_colObj2[0]
    }else{
        return {}
    }
}

function nomUsuExiste(data){
 
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
                //actualizo la fecha del token (no el token)
                obj_colObj[i].dateToken = new Date(new Date().getTime() - 3*60*60*1000);
            }
        }
        //console.log(JSON.stringify(obj_colObj))
        fs.writeFileSync('./db/seguridad.txt',JSON.stringify(obj_colObj)) 
         
        return true;
    }else{
         
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

function obtLisVer(arg1){
    console.log(arg1);
    let verListas = dameListas();
    let filVerListas = []
    //console.log(verListas[0].verificadores[0].nombre);
    //console.log("-----------------------------")
    for(var i=0 ; i<verListas.length ; i++){
        for(var j=0 ; j<verListas[i].verificadores.length ; j++){
            //console.log(verListas[i].verificadores[j].nombre)
            if(verListas[i].verificadores[j].nombre == arg1.nombre){
                filVerListas.push(verListas[i])
            }
        }
    }

    //console.log("------------------------------")
    //console.log(filVerListas)
    return filVerListas;
}

function testObtLisVer(){
    let testUsu = new Clases.Usuario()
    testUsu.setNombre("Alberto");
    console.log(obtLisVer(testUsu))
}

testObtLisVer();

module.exports = {obtLisVer, dameListas, guardarListas, guardarUsuarios , dameUsuarios, agregarUsuario, agregarSegUsuario, nomUsuExiste, eliminarUsuario, eliminarSegUsuario, obtenerUsuario, obtenerSegUsuario, dameColeccion, actualizarUsuario}