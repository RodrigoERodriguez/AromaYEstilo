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

const contenedorProductosHogar = document.querySelector("#hogar__contenedor-productos")

let botonesAgregar = document.querySelectorAll(".producto-agregar")
let botonesAgregarDeseos = document.querySelectorAll(".producto-deseo")
const numeritoCarrito = document.querySelector("#numerito-carrito")
const numeritoDeseo = document.querySelector("#numerito-deseo")

//---------------------------------------------------------------//

function cargarProductos(productosElegidos){

    contenedorProductosHogar.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="categoria__producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="categoria__producto-detalles">
                <h3 class="categoria__producto-titulo">${producto.titulo}</h3>
                <p class="categoria__producto-precio">$ ${producto.precio}</p>
                
                <div class="categoria__botones">
                    <button class="categoria__producto-carrito" id="${producto.id}">AGREGAR</button>
                    <button class="categoria__producto-deseo" id="${producto.id}"><i class="bi bi-heart"></i></button>
                </div>

            </div>
        `;

        contenedorProductosHogar.append(div);
    })

}