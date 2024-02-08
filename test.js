const Clases = require('./clases.js');
const Controlador = require('./controlador.js');
const Seguridad = require('./seguridad.js');
const fs = require('fs');


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


function testControl(){
    console.log("testControl----------------------------")
    
    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));

    console.log(unControl);

    let str_unControl = JSON.stringify(unControl);
    console.log(str_unControl);

    let json_unControl = JSON.parse(str_unControl);
    console.log(json_unControl);

    let obj_unControl = Clases.Control.fromJSON(json_unControl);
    console.log(obj_unControl);

/* 
    const recControl = JSON.parse(JSON.stringify(unControl))

    const obRecControl = Clases.Control.fromJSON(recControl);

    console.log(unControl[Object.keys(unControl)[0]] === obRecControl[Object.keys(obRecControl)[0]])
    console.log(unControl[Object.keys(unControl)[1]] === obRecControl[Object.keys(obRecControl)[1]])
    console.log(unControl[Object.keys(unControl)[2]] === obRecControl[Object.keys(obRecControl)[2]])
    console.log(unControl[Object.keys(unControl)[3]] === obRecControl[Object.keys(obRecControl)[3]])
    console.log(unControl[Object.keys(unControl)[4]].getTime() === obRecControl[Object.keys(obRecControl)[4]].getTime())
    console.log(unControl[Object.keys(unControl)[5]] === obRecControl[Object.keys(obRecControl)[5]]) 
*/
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


function todosLosTest(){
    testSegUsuario();
    testTokUsu();
    testControl();
    testObserver();
    testUsuario();
    console.log(Clases.Lista.documentar());
}

//todosLosTest()

// testListas-------------------------------------
function testLista(){
    /*   Creo una lista  */
    let unaLista = new Clases.Lista();
    unaLista.setNombre("testLista");
    //console.log(unaLista);

    /* Creo un control  previo*/
    let unControl = new Clases.Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));
    //console.log(unControl);

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
    //console.log(unUsuario);

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
    /* Agrego un autor */
    unaLista.setAutor(unVerificador);

    console.log("---------------------------")
    console.log(unaLista)

    console.log("---------------------------")
    var str_unaLista = JSON.stringify(unaLista);
    console.log(str_unaLista)

    console.log("---------------------------")    
    var obj_unaLista = JSON.parse(str_unaLista)
    var obj_unaLista = Clases.Lista.fromJSON(obj_unaLista)
    console.log(obj_unaLista);

}


//testControl();
testLista();