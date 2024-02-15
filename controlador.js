const Clases = require('./clases.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js');
const Seguridad = require('./seguridad.js');

function procesar(data){

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
        console.log("note right 'cu11_listarControles'")
        console.log("con --> mod 'dameUsuarios()'")
        let colUsu = Modelo.dameUsuarios()
        console.log("con <-r- mod '[{Usuario}]'")
        console.log("note left 'Colección de Usuarios'")

        console.log("con --> con 'filtrado por \\n nomUsu'")
        let filColUsu = colUsu.filter(x=>x.nomUsu == data.usuario.nomUsu)
        return filColUsu
    }

    if(data.cu == "cu12_actualizarControles"){
        console.log("note right 'cu12_actualizarControles'")


        //Convierto los controles en Objetos Control
        let newCon = []
        for(var i=0 ; i< data.carga.length ; i++){
            newCon.push(Clases.Control.fromJSON(data.carga[i]))
        }

        //Obtengo los usuarios para agregarle
        let colUsu = Modelo.dameUsuarios();
        //Cuando encuentro el usuario le agrego todos los controles que llegaron desde el cliente
        for(var i=0 ; i<colUsu.length ; i++){
            if(colUsu[i].nomUsu == data.usuario.nomUsu){
                colUsu[i].controles = newCon
            }
        }
        console.log("con --> mod 'guardarUsuarios([Usuario])'")

        Modelo.guardarUsuarios(colUsu);

        console.log("con --> mod 'dameListas()'")
        let colLis = Modelo.dameListas()
        console.log("con <-r- mod '[{Lista}]'")
        
        console.log(data.usuario.nomUsu)
        console.log(data.carga)

        for(var i=0 ; i<colLis.length ; i++){

            //console.log(colLis[i].autor.nomUsu)

            if(colLis[i].autor.nomUsu == data.usuario.nomUsu){
                //Estas son MIS LISTAS
                for(var j=0 ; j<colLis[i].controles.length ; j++){
                    //Estos son los controles de mis listas
                    //console.log(colLis[i].controles[j].parametro)
                    for(var k=0 ; k<data.carga.length ; k++){
                        if(colLis[i].controles[j].parametro == data.carga[k].parametro){
                            console.log(colLis[i].controles[j].parametro+" - "+data.carga[k].parametro)
                            colLis[i].controles[j] = data.carga[k]
                        }
                    }

                }
            }
            
        }

        console.log("con --> mod 'guardarListas()'")
        Modelo.guardarListas(colLis);
        
    }

    if(data.cu == "cu13_listarVerificadores"){
        console.log("note right 'cu13_listarVerificadores'")
        // Pido al modelo todos los usuarios
        console.log("con --> mod 'dameUsuarios()'" )
        let colUsu = Modelo.dameUsuarios()
        console.log("con <-r- mod '[{Usuario}]'" )

        // Elimino todos los controles del atributo Controles
        colUsu.forEach(x=>x.controles = [])
        //Devuelvo resto

        return colUsu
    }

    if(data.cu == "cu14_nuevaLista"){
        console.log("note right 'cu14_nuevaLista'")

        //Instancio el objeto de la clase Lista a partir de data;
        data.carga.type = "Lista";
        data.carga.autor.type = "Usuario"
        
        let nueLis = Clases.Lista.fromJSON(data.carga)

        console.log("con --> mod 'dameListas()'");
        let todasListas = Modelo.dameListas();
        console.log("con <-r- mod '[{Listas}]'")

        todasListas.push(nueLis)

        console.log("con --> mod 'guardarListas(todasListas)'")
        Modelo.guardarListas(todasListas)
       
        
    }

    if(data.cu == "cu15_listarListas"){
        console.log("note right 'cu15_listarListas'")

        console.log("data");
        console.log(data);

        //Pido al modelo todas las listas
        console.log("con --> mod 'dameListas()'")
        let todLis = Modelo.dameListas()

        console.log("todLis")
        console.log(todLis)

        console.log("con <-r- mod '[{Lista}]")
        //Devuelvo las listas obtenidas
        
        const lisFil = todLis.filter(x=>x.autor.nomUsu == data.usuario.nomUsu)
        //return todLis
        return lisFil;
    }

    if(data.cu == "cu17_listasVerificar"){
        console.log("note rigth 'cu17_listasVerificar'")
        //Pido al modelo todas las listas para verificar
        console.log("con --> mod 'listasVerificar()'")
        let lisVer = Modelo.obtLisVer(data.usuario)
        console.log("con <-r- mod '[{Lista}]")
        //Devuelvo las listas obtenidas
        return lisVer;
    }

}



module.exports = {procesar}
