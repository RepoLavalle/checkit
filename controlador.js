const Clases = require('./clases.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js');

function procesar(){

    let cu = "nuevo control"

    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));

    const oSU = new Clases.SegUsuario("Enzo","1234");
    oSU.setToken("39mv0nct89u98mwc8cctmw")
    oSU.setDateToken(new Date());

    const testUsu = new Clases.Usuario();
    testUsu.nombre = "Adrian"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"
    testUsu.agregarControl(unControl);

    console.log("testUsu")
    console.log(testUsu)

    let carga = {}
    carga.cu = cu
    carga.usu = testUsu
    carga.carga = unControl

    console.log("carga")
    console.log(carga)
    

    let colUsu = Modelo.dameColeccion("usuarios")
    console.log("colUsu");
    console.log(colUsu);
    /*colUsu.forEach(x=>{
        console.log(x);
        console.log(x.nombre == testUsu.nombre);
        if(x.nombre == testUsu.nombre){
            x.controles.push(unControl)
        }

    })*/

}

module.exports = {procesar}
