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
    
    console.log(data)

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

        return true;        
    }else{
        return false;
    }



}

module.exports = {regUsu};