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
}

testUsuario();