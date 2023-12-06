const Clases = require('./clases.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js');
const Seguridad = require('./seguridad.js');

function procesar(data){
    console.log("--> con 'procesar(data)'")
    //console.log(data);

    // si caso de uso es nuevoControl
    if(data.cu == "nuevoControl"){
        console.log("note right 'cu = nuevoControl'")
        // Obtengo todos los usuarios

        console.log("con --> mod 'dameUsuarios()'")        
        let colUsuario = Modelo.dameUsuarios();

        //Convierto el control de la carga en objeto
        let conNuevo = Clases.Control.fromJSON(data.carga)

        //convierto la fecha desde en objeto date (fecha)
        let desde = new Date(data.carga.desde)
        // console.log("desde")
        // console.log(desde)

        // calculo desde menos la periodicidad
        conNuevo.ultimaVer = new Date(desde.getTime() - parseInt(data.carga.periodicidad) * 1000 * 60 * 60 * 24)

        // Recorro la colección de usuarios para agregar el nuevo control
        for(var i=0 ; i<colUsuario.length ;  i++){
            if(colUsuario[i].nomUsu == data.usuario.nomUsu){
                colUsuario[i].agregarControl(conNuevo)
            }
        }
        console.log("con --> mod 'guardarUsuarios([Usuario])'")
        Modelo.guardarUsuarios(colUsuario);
    }

    if(data.cu == "cu11_listarControles"){
        console.log("note right 'cu11_listarControles")
        let colUsu = Modelo.dameUsuarios()
        let filColUsu = colUsu.filter(x=>x.nomUsu == data.usuario.nomUsu)
        //console.log(filColUsu)
        return filColUsu
    }

    if(data.cu == "cu12_actualizarControles"){
        console.log("note right 'cu12_actualizarControles'")
        //console.log(data.carga);

        //Convierto los controles en Objetos Control
        let newCon = []
        for(var i=0 ; i< data.carga.length ; i++){
            newCon.push(Clases.Control.fromJSON(data.carga[i]))
        }
        //console.log(newCon)

        //Obtengo los usuarios para agregarle
        console.log(Modelo.dameUsuarios());
        let colUsu = Modelo.dameUsuarios();
        for(var i=0 ; i<colUsu.length ; i++){
            if(colUsu[i].nomUsu == data.usuario.nomUsu){
                //console.log("encontre coincidencia")
                colUsu[i].controles = newCon
            }
        }
        console.log("con --> mod 'guardarUsuarios([Usuario])'")

        Modelo.guardarUsuarios(colUsu);

    }


}



module.exports = {procesar}
