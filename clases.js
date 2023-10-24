

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

function testUsuario(){
    const testUsu = new Usuario();
    testUsu.nombre = "testNombre"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"
    console.log(testUsu);
    const testUsuStr = JSON.stringify(testUsu)
    console.log(testUsuStr)
    const recuTestUsu = Usuario.fromJSON(JSON.parse(testUsuStr));
    console.log(recuTestUsu);
    console.log(recuTestUsu.getNombre());
    console.log(recuTestUsu.getApellido());
    console.log(recuTestUsu.getNomUsu());
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

function testSegUsuario(){
    const oSU = new SegUsuario("Enzo","1234");
    oSU.setToken("39mv0nct89u98mwc8cctmw")
    oSU.setDateToken(new Date());
    console.log(oSU);
}

class TokUsu{
    constructor(usu, segUsu){
        this.nombre = usu.nombre;
        this.apellido = usu.apellido;
        this.nomUsu = usu.nomUsu;
        this.token = segUsu.token;
    }
}

function testTokUsu(){
    const testUsu = new Usuario();
    testUsu.nombre = "testNombre"
    testUsu.apellido = "testApellido"
    testUsu.nomUsu = "testNomUsu"

    const oSU = new SegUsuario("Enzo","1234");
    oSU.setToken("39mv0nct89u98mwc8cctmw")
    oSU.setDateToken(new Date());

    const miTokUsu = new TokUsu(testUsu, oSU);
    console.log(miTokUsu);
}




module.exports = {Usuario, SegUsuario, TokUsu, testUsuario, testSegUsuario, testTokUsu};