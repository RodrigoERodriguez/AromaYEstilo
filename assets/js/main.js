//---------------------------------------------------------------//

let productosHogar = [];

//---------------------------------------------------------------//

fetch("../assets/js/hogar.json")
    .then(response => response.json())
    .then(data => {
        productosHogar = data;
        cargarProductos(productosHogar);
    })

//- ELEMENTOS DEL DOM -//

let botonesAgregar = document.querySelectorAll(".producto-agregar")
let botonesAgregarDeseos = document.querySelectorAll(".producto-deseo")
const numeritoCarrito = document.querySelector("#numerito-carrito")
const numeritoDeseo = document.querySelector("#numerito-deseo")


//- FUNCIONALIDADES DE BOTONES -//

function actualizarBotonAgregar () {
    botonesAgregar = document.querySelectorAll(".categoria__producto-carrito")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

function actualizarBotonAgregarDeseos () {
    botonesAgregarDeseos = document.querySelectorAll(".categoria__producto-deseo")

    botonesAgregarDeseos.forEach(boton => {
        boton.addEventListener("click", agregarListaDeDeseos);
    })
}

//---------------------------------------------------------------//

let productosEnCarrito;
let productosEnDeseos;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
let productosEnListaDeDeseosLS = localStorage.getItem("productos-en-lista-de-deseos");

//---------------------------------------------------------------//

if(productosEnCarritoLS){

    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    ActualizarCarrito();

} else {
    productosEnCarrito = [];
}

if(productosEnListaDeDeseosLS){

    productosEnDeseos = JSON.parse(productosEnListaDeDeseosLS);
    ActualizarListaDeDeseos();

} else {
    productosEnDeseos = [];
}

//---------------------------------------------------------------//

function agregarAlCarrito (e) {



    const idBoton = e.currentTarget.id;
    const productoAgregadoAlCarrito = productosHogar.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregadoAlCarrito.cantidad = 1;
        productosEnCarrito.push(productoAgregadoAlCarrito);
    }

    ActualizarCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//---------------------------------------------------------------//

function ActualizarCarrito() {
    let nuevoNumeritoCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeritoCarrito.innerText = nuevoNumeritoCarrito;
}

//---------------------------------------------------------------//

function agregarListaDeDeseos(e) {



    const idBoton = e.currentTarget.id;
    const productoAgregadoADeseos = productosHogar.find(producto => producto.id === idBoton);

    if(productosEnDeseos.some(producto => producto.id === idBoton)) {
        const index = productosEnDeseos.findIndex(producto => producto.id === idBoton);
        productosEnDeseos[index].cantidad++;
    } else {
        productoAgregadoADeseos.cantidad = 1;
        productosEnDeseos.push(productoAgregadoADeseos);
    }

    ActualizarListaDeDeseos();

    localStorage.setItem("productos-en-lista-de-deseos", JSON.stringify(productosEnDeseos));
}

//---------------------------------------------------------------//

function ActualizarListaDeDeseos() {
    let nuevoNumeritoDeseo = productosEnDeseos.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeritoDeseo.innerText = nuevoNumeritoDeseo;
}