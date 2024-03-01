

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

    static documentar(){
        let str = ""
        str += "class segUsuario {\n"+
        "this.nomUsu : string \n " +
        "this.pass : string \n " +
        "this.token : string \n " +
        "this.dateToken : date \n " +

        "setDateToken(dat):void \n " +
        "getDateToken(): date \n " +
        "setToken(tk)  :void \n " +
        "getToken(): string \n " +
        "setNomUsu(usu):void \n " +
        "getNomUsu(): string \n " +
        "setPass(pas)  :void \n " +
        "getPass():string \n " +
        "}"
        return str;
    }
       
}

//console.log(SegUsuario.documentar())

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
        //this.observadores = [];
        this.ultimaVer = "";
        this.type = "Control"
    }

    static fromJSON(json){
        if(json.type = "Control"){
            const obCon = new Control();
            obCon.setParametro(json.parametro)
            obCon.setPeriodicidad(parseInt(json.periodicidad))
            obCon.setProrrogable(json.prorrogable)
            obCon.setReajustable(json.reajustable)
            obCon.setUltimaVer(new Date(json.ultimaVer))
            obCon.type = json.type
            return obCon
        }else{
            return "Error de typo"
        }
    }

    setUltimaVer(dat){
        this.ultimaVer = dat;
    }

    getUltimaVer(){
        return this.ultimaVer;
    }

    atraso(){
        var hoy = new Date();
        var otro = new Date(this.ultimaVer)
        var difNumFec = hoy.getTime()-otro.getTime()
        var difDia = difNumFec/(1000*60*60*24)
        return parseInt(difDia)
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

class Lista{
    constructor(){
        this.nombre;
        this.autor = {};
        this.controles = [];
        this.observadores = [];
        this.verificadores = [];
        this.type = "Lista";
    }

    static fromJSON(json){
        
        if(json.type == "Lista"){
            //Instancio controles
            let estaLista = new Lista();

            estaLista.autor = Usuario.fromJSON(json.autor);

            estaLista.setNombre(json.nombre) 

            //console.log(estaLista.nombre)  
                
            for(var i=0 ; i<json.controles.length ; i++){
                estaLista.agregarControl(Control.fromJSON(json.controles[i]))
            }

            for(var i=0 ; i<json.verificadores.length ; i++){
                estaLista.agregarVerificador(Usuario.fromJSON(json.verificadores[i]))
            }
            estaLista.type = json.type

            return estaLista;
        }
        
    }

    static documentar(){
        let str = "class Lista{ \n "
        str += "nombre : String \n"
        str += "controles : Control \n"
        str += "verificadores : Usuario \n"
        str += "agregarVerificador(ver) : void \n"
        str += "agregarControl(con) \n"
        str += "setNombre(nom) \n"
        str += "getNombre() \n"
        str += "}"
        str += "\n"
        str += "Lista '1'--> Control '1..n'; \n"
        str += "Lista '1'--> Usuario '1..n';"

        return str
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

    setAutor(aut){
        this.autor = aut;
    }

    setNombre(nom){
        this.nombre = nom;
    }

    getNombre(){
        return this.nombre;
    }
}

//console.log(Lista.documentar())



module.exports = {Lista, Usuario, SegUsuario, TokUsu, Control, Lista};