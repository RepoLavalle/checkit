const Clases = require('./clases.js')
const Modelo = require('./modelo.js')
const { v4: uuidv4 } = require('uuid');

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
        segUsu.setDateToken(new Date());

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
    //console.log(data)
    // pregunto si el usuario existe
    let tmp1 = Modelo.nomUsuExiste(data)
    //console.log(tmp1);
    // si el usuario existe, pido usuario y seguridad usuario

    let respuesta={}
    if(tmp1){

        let usuario_A = Modelo.obtenerUsuario(data.user);
        let usuario_AS= Modelo.obtenerSegUsuario(data.user);
        let unTokUsu = new Clases.TokUsu(usuario_A, usuario_AS);
        console.log(usuario_A)
        console.log(usuario_AS)
        console.log("Usuario correcto")
        
        respuesta.validar = true;
        respuesta.carga = unTokUsu;
    }else{
        console.log("Usuario incorrecto")
        respuesta.validar = false;
        respuesta.carga = {};        
    }

    return respuesta

}

function testValidarUsuario(){
    let testObj ={
        user: 'Nexo',
        pass: '1234',
        cu00: 'Ingresar'
      }
    validarUsuario(testObj)
        let testObj2 ={
        user: 'Nexo',
        pass: '12345',
        cu00: 'Ingresar'
      }
    validarUsuario(testObj)
    validarUsuario(testObj2)
}

//testValidarUsuario();

module.exports = {regUsu, validarUsuario};