const fs = require('fs')




function testEscritura(){
    fs.writeFileSync('./db/seguridad.txt',JSON.stringify(new Date()))
}

function testLectura(){
    var texto = fs.readFileSync('./db/seguridad.txt','utf-8')
    console.log(texto)
}

//testEscritura()
//testLectura()

function guardarObjeto(obj){
    let str_colObj = fs.readFileSync('./db/seguridad.txt','utf-8')
    let obj_colObj = []
    if(str_colObj){
        obj_colObj = JSON.parse(str_colObj);
        obj_colObj.push(obj)
                
    }else{
        obj_colObj = [];
        obj_colObj.push(obj)
    }
    str_colObj = JSON.stringify(obj_colObj)
    fs.writeFileSync('./db/seguridad.txt',str_colObj)
}

const miOb = {}
miOb.nombre = "Enzo"
miOb.apellido = "Soria"

guardarObjeto(miOb);