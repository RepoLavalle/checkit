

class Usuario{
    constructor(){
        this.nombre;
        this.apellido;
        this.nomUsu;
        this.type = "Usuario";
        this.controles = []
    }

    static fromJSON(json){
        if(json.type == "Usuario"){
            const objUsu = new Usuario();
            objUsu.nombre = json.nombre
            objUsu.apellido = json.apellido
            objUsu.nomUsu = json.nomUsu
            objUsu.type = json.type
            return objUsu
        }else{
            return "Error de tipo."
        }
    }

    agregarControl(con){
        this.controles.push(con)
    }

    setNombre(arg){
        this.nombre = arg;
    }
    setApellido(arg){
        this.apellido = arg;
    }
    setNomUsu(arg){
        this.nomUsu = arg;
    }

    getNombre(){
        return this.nombre
    }
    getApellido(){
        return this.apellido
    }
    getNomUsu(){
        return this.nomUsu
    }

}

class SegUsuario{
    constructor(nomUsu, pass){
         this.nomUsu = nomUsu
         this.pass = pass
         this.token;
         this.dateToken;
    }

    setDateToken(dat){
        this.dateToken = dat;
    }

    getDateToken(){
        return this.dateToken;
    }

    setToken(tk){
        this.token = tk;
    }

    getToken(){
        return this.token;
    }
    
    setNomUsu(usu){
        this.nomUsu = usu
    }

    getNomUsu(){
        return this.nomUsu
    }

    setPass(pas){
        this.pass = pas
    }

    getPass(){
        return this.pass
    }
       
}

class TokUsu{
    constructor(usu, segUsu){
        this.nombre = usu.nombre;
        this.apellido = usu.apellido;
        this.nomUsu = usu.nomUsu;
        this.token = segUsu.token;
    }
}

// Clases del modelo ---------------------------------
class Control{
    constructor(){
        this.parametro="";
        this.periodicidad = 1;
        this.prorrogable = true;
        this.reajustable = true;
        this.observadores = [];
        this.ultimaVer = "";
    }

    setUltimaVer(dat){
        this.ultimaVer = dat;
    }

    getUltimaVer(){
        return this.ultimaVer;
    }

    suscribir(lis){
        this.observadores.push(lis)
    }

    setReajustable(re){
        this.reajustable = re;
    }

    getReajustable(){
        this.reajustable;
    }

    setProrrogable(pro){
        this.prorrogable = pro;
    }

    getProrrogable(){
        return this.prorrogable;
    }

    setPeriodicidad(per){
        this.periodicidad = per;
    }

    getPeriodicidad(){
        return this.periodicidad;
    }
    setParametro(par){
        this.parametro = par;
    }

    getParametro(){
        return this.parametro;
    }
}

class Lista{
    constructor(){
        this.nombre;
        this.controles = [];
        this.observadores = [];
        this.verificadores = [];
    }

    agregarObservador(obs){
        this.observadores.push(obs);
    }

    agregarVerificador(ver){
        this.verificadores.push(ver);
    }

    agregarControl(con){
        this.controles.push(con);
    }

    actualizar(){

    }

    setNombre(nom){
        this.nombre = nom;
    }

    getNombre(){
        return this.nombre;
    }
}

class Partida{
    constructor(){
        this.verificadores = [];
        this.listas = [];
    }

    agregarVerificador(ver){
        this.verificadores.push(ver);
    }

    agregarLista(lis){
        this.listas.push(lis);
    }
}

function testObserver(){

    /*   Creo una lista  */
    let unaLista = new Lista();
    unaLista.setNombre("testLista");
    console.log(unaLista);

    /* Creo un control  previo*/
    let unControl = new Control();
    unControl.setParametro("Tensión de Baterías");
    unControl.setPeriodicidad(2);
    unControl.setProrrogable(true);
    unControl.setReajustable(true);
    unControl.setUltimaVer(new Date(2023,9,30,0,0,0,0));
    console.log(unControl);

    /* Creo otro Control posterior*/
    let esteControl = new Control();
    esteControl.setParametro("Pago alojamiento");
    esteControl.setPeriodicidad(4);
    esteControl.setProrrogable(true);
    esteControl.setReajustable(true);
    esteControl.setUltimaVer(new Date(2023,9,30,0,0,0,0))

    /* Creo otro Control posterior*/
    let otroControl = new Control();
    otroControl.setParametro("Estado de Red");
    otroControl.setPeriodicidad(6);
    otroControl.setProrrogable(true);
    otroControl.setReajustable(true);
    otroControl.setUltimaVer(new Date(2023,9,30,0,0,0,0))

    /* Creo un usuario */
    let unUsuario = new Usuario();
    unUsuario.setNomUsu("testUsu");
    unUsuario.setNombre("testNombre");
    unUsuario.setApellido("test Apellido");
    console.log(unUsuario);

    /* Creo un usuario verificador */
    let unVerificador = new Usuario();
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

testObserver();


module.exports = {Usuario, SegUsuario, TokUsu, Control};