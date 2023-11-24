const Clases = require('./clases.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js');
const Seguridad = require('./seguridad.js');

function procesar(data){
    console.log("-->[controlador] 'procesar(data)'")
    console.log(data);

    // si caso de uso es nuevoControl
    if(data.cu == "nuevoControl"){

        // Obtengo todos los usuarios
        let colUsuario = Modelo.dameUsuarios();
        console.log(colUsuario);

        //Convierto el control de la carga en objeto
        let conNuevo = Clases.Control.fromJSON(data.carga)
        console.log("conNuevo")
        console.log(conNuevo)

        //convierto la fecha desde en objeto date (fecha)
        let desde = new Date(data.carga.desde)
        // console.log("desde")
        // console.log(desde)

        // calculo desde menos la periodicidad
        console.log( new Date(desde.getTime() - parseInt(data.carga.periodicidad) * 1000 * 60 * 60 * 24) )
        conNuevo.ultimaVer = new Date(desde.getTime() - parseInt(data.carga.periodicidad) * 1000 * 60 * 60 * 24)

        console.log(conNuevo)

        // Recorro la colección de usuarios para agregar el nuevo control
        for(var i=0 ; i<colUsuario.length ;  i++){
            if(colUsuario[i].nomUsu == data.usuario.nomUsu){
                colUsuario[i].agregarControl(conNuevo)
            }
        }

        console.log(" (con control agregado)")
        console.log(colUsuario)

        Modelo.guardarUsuarios(colUsuario);
    }

    if(data.cu == "cu11_listarControles"){
        console.log("con --> con 'cu11_listarControles")
        let colUsu = Modelo.dameUsuarios()
        let filColUsu = colUsu.filter(x=>x.nomUsu == data.usuario.nomUsu)
        console.log(filColUsu)
        return filColUsu
    }
}



module.exports = {procesar}
