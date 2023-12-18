const Clases = require('./clases.js')
const Modelo = require('./modelo.js')
const { v4: uuidv4 } = require('uuid');
const Controlador = require('./controlador.js');

//const uuid = uuidv4();
//console.log(uuid);

/**
 * 
 * @param {nombre, apellido, unoUsu, pass} data 
 */
function regUsu(data){
    console.log("--regUsu(req.body)-->[seguridad]")
    
    //console.log(data)

    if(!Modelo.nomUsuExiste(data.nomUsu)){
        const usua = new Clases.Usuario();        
        usua.setNombre(data.nombre)
        usua.setApellido(data.apellido)
        usua.setNomUsu(data.nomUsu)

        const segUsu = new Clases.SegUsuario();
        segUsu.setNomUsu(data.nomUsu);
        segUsu.setPass(data.pass);
        segUsu.setToken(uuidv4());
        segUsu.setDateToken(ya());

        Modelo.agregarUsuario(usua);
        Modelo.agregarSegUsuario(segUsu);
        console.log("<-- true --[seguridad]")
        return true;        
    }else{
        console.log("<-- false --[seguridad]")
        return false;
    }



}

function validarUsuario(data){
    console.log("--> seg 'validarUsuario(data)'")
    console.log(data)
    // Este mètodo sirve para generar el primer token de usuario de sesión.
    // pregunto si el usuario existe
    let tmp1 = Modelo.nomUsuExiste(data)
    
    
    let respuesta={}
    if(tmp1){

        // si el usuario existe, pido usuario y seguridad usuario
        let usuario_A = Modelo.obtenerUsuario(data.user);
        let usuario_AS= Modelo.obtenerSegUsuario(data.user);
        // Instancio un Token de Usuario
        let unTokUsu = new Clases.TokUsu(usuario_A, usuario_AS);

        respuesta.validar = true;
        respuesta.carga = unTokUsu;
    }else{
        console.log("Usuario incorrecto")
        respuesta.validar = false;
        respuesta.carga = {};        
    }

    console.log("<-r- seg '{respuesta}'")
    return respuesta

}

function procesar(data){
    console.log("--> seg 'procesar(data)'")
    let segUsu = Modelo.obtenerSegUsuario(data.usuario.nomUsu)

    if((ya().getTime() - (new Date(segUsu.dateToken)).getTime()  ) /(1000*60*60*24) < 20){
        console.log("seg --> con 'procesar(data)' ")
        let tmp = Controlador.procesar(data)
        
        if(tmp != undefined){
            console.log("<-r- seg 'procesar(data)' ")
            return tmp
        }
        
    }else{
        console.log("<-r- seg 'token vencido'");
        return false;
    }
}

function validarToken(data){

}

function ya(){
    // console.log(new Date());
    // console.log(new Date().getTime());
    // console.log(new Date().getTime() - 3*60*60*1000);
    // console.log(new Date(new Date().getTime() - 3*60*60*1000));
    return (new Date(new Date().getTime() - 3*60*60*1000));
}

function testYa(){
    console.log(ya());
}

testYa();

module.exports = {regUsu, validarUsuario, procesar, ya};