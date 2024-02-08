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

    // Este mètodo sirve para generar el primer token de usuario de sesión.
    // pregunto si el usuario existe
    console.log("seg --> mod 'nomUsuExiste(data)'")
    let tmp1 = Modelo.nomUsuExiste(data)
 
    let respuesta={}
    if(tmp1){

        // si el usuario existe, pido usuario y seguridad usuario
        console.log("seg <-r- mod 'true'")
        
        console.log("seg --> mod 'obtenerUsuario(data.user)'")
        console.log("seg --> mod 'obtenerUsuario("+data.user+")'")
        let usuario_A = Modelo.obtenerUsuario(data.user);
        console.log("seg <-r- mod '{Usuario}'")
 
        console.log("seg --> mod 'obtenerSegUsuario(data.user)'")
        let usuario_AS= Modelo.obtenerSegUsuario(data.user);
        console.log("seg <-r- mod '{SegUsuario}'")
 
        // Instancio un Token de Usuario
        console.log("seg --> seg 'new TokUsu'")
        let unTokUsu = new Clases.TokUsu(usuario_A, usuario_AS);

        respuesta.validar = true;
        respuesta.carga = unTokUsu;
    }else{
        respuesta.validar = false;
        respuesta.carga = {};        
    }

    
    return respuesta

}

function procesar(data){
 
    console.log("seg --> mod 'obtenerSegUsuario(data.usuario.nomUsu)'")
    let segUsu = Modelo.obtenerSegUsuario(data.usuario.nomUsu)
    console.log("seg <-r- mod '(data.usuario.nomUsu)'")
 
    if((ya().getTime() - (new Date(segUsu.dateToken)).getTime()  ) /(1000*60*60*24) < 20){
        console.log("seg --> con 'procesar(data)' ")
        let tmp = Controlador.procesar(data)
        
        if(tmp != undefined){
            console.log("seg <-r- con")
            return tmp
        }
        
    }else{
        console.log("seg <-r- con 'token vencido'");
        return false;
    }
}

function validarToken(data){

}

function ya(){
 
    return (new Date(new Date().getTime() - 3*60*60*1000));
}

function testYa(){
    console.log(ya());
}

testYa();

module.exports = {regUsu, validarUsuario, procesar, ya};