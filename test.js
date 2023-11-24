const Clases = require('./clases.js');
const Modelo = require('./modelo.js');
const Controlador = require('./controlador.js');
const Seguridad = require('./seguridad.js');
const fs = require('fs');

function testValidarUsuario(){
    let testObj ={
        user: 'Nexo',
        pass: '1234',
        cu00: 'Ingresar'
      }
    Seguridad.validarUsuario(testObj)
        let testObj2 ={
        user: 'Nexo',
        pass: '12345',
        cu00: 'Ingresar'
      }
    Seguridad.validarUsuario(testObj)
    Seguridad.validarUsuario(testObj2)
}



//  agregarUsuario-----------------------------------
function testAgregarUsuario(){
    const nU = new Clases.Usuario();
    nU.setNombre("Enzo")
    nU.setApellido("Vonkunoschy");
    nU.setNomUsu("vonku")
    Modelo.agregarUsuario(nU);
}



//  agregarSegUsuario-------------------------------
function testAgregarSegUsuario(){
    const oSU = new Clases.SegUsuario();
    oSU.setNomUsu("vonku")
    oSU.setPass("1234")
    oSU.setToken("jkde90t09ijfer")
    oSU.setDateToken(Seguridad.ya());
    Modelo.agregarSegUsuario(oSU)
}


//  nomUsuExiste------------------------------------
function testNomUsuExiste(){
    //testAgregarUsuario()
    if(Modelo.nomUsuExiste("vonku")){
        console.log("test nomUsuExiste(...) Exitoso")
    }else{
        console.log("test nomUsuExiste(...) Falló")
    }
    //Modelo.eliminarUsuario("vonku");
}


//   obtenerUsuario---------------------------------
function testObtenerUsuario(){
    console.log(Modelo.obtenerUsuario("vonku"))
}


//  obtenerSegUsuario-------------------------------
function testObtenerSegUsuario(){
    console.log(Modelo.obtenerSegUsuario("vonku"))
}



//   eliminarUsuario---------------------------------
function testEliminarUsuario(){
    //testAgregarUsuario()
    Modelo.eliminarUsuario("vonku")  
}



//   eliminarSegUsuario-----------------------------
function testEliminarSegUsuario(){
    Modelo.eliminarSegUsuario("vonku")
}


//   Clase Usuario ---------------------------------
function testUsuario(){
    console.log("testUsuario----------------------------------------")
    const testUsu = new Clases.Usuario();
    testUsu.nombre = "testNombre"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"
 
    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));

    testUsu.agregarControl(unControl);
    console.log(testUsu)

    let otroControl = new Clases.Control();
    otroControl.setParametro("Temperatura");
    otroControl.setPeriodicidad(4);
    otroControl.setProrrogable(true);
    otroControl.setReajustable(true);
    otroControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));

    testUsu.agregarControl(otroControl);
    console.log(testUsu)

    console.log("fin-----------------------------------------------")
}


//  Clase SegUsuario ------------------------------
function testSegUsuario(){
    const oSU = new Clases.SegUsuario("Enzo","1234");
    oSU.setToken("39mv0nct89u98mwc8cctmw")
    oSU.setDateToken(Seguridad.ya());
    console.log(oSU);
}


function testTokUsu(){
    const testUsu = new Clases.Usuario();
    testUsu.nombre = "testNombre"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"

    const oSU = new Clases.SegUsuario("Enzo","1234");
    oSU.setToken("39mv0nct89u98mwc8cctmw")
    oSU.setDateToken(Seguridad.ya());

    const miTokUsu = new Clases.TokUsu(testUsu, oSU);
    console.log(miTokUsu);
}


function testDameColeccion(){
    console.log("testDameColeccion----------------------")

    let colUsu = Modelo.dameColeccion("usuarios");
    console.log(colUsu);

    console.log("fin-----------------------------------")    
}


function testControl(){
    console.log("testControl----------------------------")
    
    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));

    const recControl = JSON.parse(JSON.stringify(unControl))

    const obRecControl = Clases.Control.fromJSON(recControl);

    console.log(unControl[Object.keys(unControl)[0]] === obRecControl[Object.keys(obRecControl)[0]])
    console.log(unControl[Object.keys(unControl)[1]] === obRecControl[Object.keys(obRecControl)[1]])
    console.log(unControl[Object.keys(unControl)[2]] === obRecControl[Object.keys(obRecControl)[2]])
    console.log(unControl[Object.keys(unControl)[3]] === obRecControl[Object.keys(obRecControl)[3]])
    console.log(unControl[Object.keys(unControl)[4]].getTime() === obRecControl[Object.keys(obRecControl)[4]].getTime())
    console.log(unControl[Object.keys(unControl)[5]] === obRecControl[Object.keys(obRecControl)[5]]) 

}


//-----------------------------------

function testObserver(){

    /*   Creo una lista  */
    let unaLista = new Clases.Lista();
    unaLista.setNombre("testLista");
    console.log(unaLista);

    /* Creo un control  previo*/
    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));
    console.log(unControl);

    /* Creo otro Control posterior*/
    let esteControl = new Clases.Control();
    esteControl.setParametro("Pago alojamiento");
    esteControl.setPeriodicidad(4);
    esteControl.setProrrogable(true);
    esteControl.setReajustable(true);
    esteControl.setUltimaVer(new Date(2023,9,30,0,0,0,0))

    /* Creo otro Control posterior*/
    let otroControl = new Clases.Control();
    otroControl.setParametro("Estado de Red");
    otroControl.setPeriodicidad(6);
    otroControl.setProrrogable(true);
    otroControl.setReajustable(true);
    otroControl.setUltimaVer(new Date(2023,9,30,0,0,0,0))

    /* Creo un usuario */
    let unUsuario = new Clases.Usuario();
    unUsuario.setNomUsu("testUsu");
    unUsuario.setNombre("testNombre");
    unUsuario.setApellido("test Apellido");
    console.log(unUsuario);

    /* Creo un usuario verificador */
    let unVerificador = new Clases.Usuario();
    unVerificador.setNombre("nombre verificador");
    unVerificador.setApellido("apell Verificador");
    unVerificador.setNomUsu("testUsuVer");

    /* Agrego una observador a la lista */
    unaLista.agregarObservador(unUsuario)
    /* Agrego un control a la lista  */
    unaLista.agregarControl(unControl);
    /* Agrego un verificador a la lista */
    unaLista.agregarVerificador(unVerificador);
    /* Agregar otro control */
    unaLista.agregarControl(otroControl);
    unaLista.agregarControl(esteControl);

    console.log("Lista -----------------");
    console.log(unaLista);

    procesarLista(unaLista);


}

function procesarLista(lis){
    console.log("Procesanso Lista ------------------------------------");
    var fecha = new Date();
    console.log(fecha.toLocaleString());
    
    console.log("Lista sin procesar:")
    console.log(lis)
    let hoy = new Date();
    console.log(lis.controles.forEach(x=>{
        console.log((hoy.getTime() - x.ultimaVer.getTime())/(1000*60*60*24));
        let ddias = parseInt((hoy.getTime() - x.ultimaVer.getTime())/(1000*60*60*24))
        console.log("ddias: "+ddias)
        console.log("periodicidad: ",x.periodicidad)
        let difd = x.periodicidad - ddias
        console.log("difd: "+ difd)
        console.log(x.periodicidad <= parseInt((hoy.getTime() - x.ultimaVer.getTime())/(1000*60*60*24)))


    }));

    let nuevaLis = lis.controles.filter(x=>(x.periodicidad <= parseInt((hoy.getTime() - x.ultimaVer.getTime())/(1000*60*60*24))))
    console.log("Lista procesada: ------------------------")
    console.log(nuevaLis)
}

//-----------------------------------

function testGuardarUsuarios(){
    //let strTest = [{"type":"Usuario","controles":[],"nombre":"Enzo","apellido":"Vonkunoschy","nomUsu":"enzo"},{"type":"Usuario","controles":[],"nombre":"Tomas","apellido":"Camargo","nomUsu":"tomy"}]
    Modelo.guardarUsuarios(Modelo.dameUsuarios())
}


function testDameUsuarios(){
    console.log(Modelo.dameUsuarios())
}


function todosLosTest(){
    testValidarUsuario();

    testAgregarUsuario();
    testAgregarSegUsuario();
    
    testNomUsuExiste();
    testObtenerUsuario();
    testObtenerSegUsuario();

    testEliminarSegUsuario();
    testEliminarUsuario();


    testSegUsuario();
    testTokUsu();
    testDameColeccion();
    testControl();
    testObserver();
    testGuardarUsuarios();
    testUsuario();
    testDameUsuarios();
}

todosLosTest()