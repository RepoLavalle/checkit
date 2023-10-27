

class Usuario{
    constructor(){
        this.nombre;
        this.apellido;
        this.nomUsu;
        this.type = "Usuario";
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
    }

    suscribir(lis){
        this.observadores.push(lis)
    }

    setReajustable(re){
        this.reajustable;
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
        this.periodicidad;
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
    }

    actualizar(){
        
    }
}
module.exports = {Usuario, SegUsuario, TokUsu};