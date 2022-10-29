console.log("archivo js")

const socketClient = io()

let user;
Swal.fire({
    title:"Hola usuario",
    text:"bienvenido, ingresa tu usario",
    input:"text",
    allowOutsideClick:false
}).then(respuesta=>{
    // console.log(respuesta)
    user = respuesta.value;
});

const productsForm = document.getElementById("productsForm");
productsForm.addEventListener("submit",(e)=>{
    //prevenir comportamientos por defecto no deseados del formulario
    e.preventDefault();
    const product ={
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    console.log(product)
    //enviamos el nuevo producto al servidor.
    socketClient.emit("newProduct",product);
})

const createTable = async (data) =>{
    const resp = await fetch("./templates/form.hbs")
    const result = await resp.text()
    const template = Handlebars.compile(result)
    const html = template({products:data})
    return html
}

const containerProducts = document.getElementById("containerProducts")

socketClient.on("products", async (data) =>{
   const htmlProducts = await createTable(data)
   containerProducts.innerHTML = htmlProducts
})


const textField = document.getElementById("message")
textField.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        socketClient.emit("message",{
            username:user,
            message:textField.value
        })
        textField.value ="";
    }
})

socketClient.on("history", (data) =>{
    console.log(data)
})



socketClient.on("messageFromServer", (data) =>{
    console.log(data)
})
