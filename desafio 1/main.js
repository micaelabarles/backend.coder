class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido, 
        this.libros = [libros], 
        this.mascotas = [mascotas]
    }

    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(){
        arrayMascotas.push("Roma")
        console.log(arrayMascotas)
    }

    countMascota(){
      console.log(arrayMascotas.length)
    }

    addBook(){
    this.libros.push (infoLibros)
    }

    getBookNames(){
        console.log(nombreLibros)
    }
}

const USER = new Usuario ("Carla","Fuentes")

let arrayMascotas = ["Tom", "Sara", "Felipe"]

let infoLibros = [
    {nombre: "Harry potter", autor:"J. K. Rowling"}, 
    {nombre: "El lobo de Wall Street", autor:"Jordan Belfort"}
]

let nombreLibros = infoLibros.map((infoLibros) => infoLibros.nombre)

USER.getFullName()
USER.addMascota()
USER.countMascota()
USER.addBook()
USER.getBookNames()