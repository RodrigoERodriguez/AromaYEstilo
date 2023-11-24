//---------------------------------------------------------------//

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

//- ELEMENTOS DEL DOM -//

const carritoVacio = document.querySelector("#carrito__carrito-vacio");
const carritoProductos = document.querySelector("#carrito__carrito-productos");
const carritoAcciones = document.querySelector("#carrito__carrito-acciones");
const carritoComprado = document.querySelector("#carrito__carrito-comprado");
let eliminar =document.querySelectorAll(".carrito__carrito-producto-eliminar");
const vaciar = document.querySelector("#carrito__carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#carrito__total");
const comprar = document.querySelector("#carrito__carrito-acciones-comprar");

//---------------------------------------------------------------//

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > -1) {

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
        
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito__carrito-producto");
            div.innerHTML = `
                <img class="carrito__carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito__carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito__carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito__carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito__carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito__carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            carritoProductos.append(div);
        });
    
    } else {
    
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    
    }

    actualizarBotonEliminar();
    actualizarTotal();
}

cargarProductosCarrito();
actualizarBotonEliminar();

//---------------------------------------------------------------//

function actualizarBotonEliminar() {
    eliminar = document.querySelectorAll(".carrito__carrito-producto-eliminar");

    eliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

//---------------------------------------------------------------//

function eliminarDelCarrito(e){

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            },

            onClick: function(){} // Callback after click
    }).showToast();

    const idBoton= e.currentTarget.id;

    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//---------------------------------------------------------------//

vaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: "¿Estas seguro?",
        icon: "question",
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            cargarProductosCarrito();
        }
    });
}

//---------------------------------------------------------------//

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    carrito__total.innerText = `$ ${totalCalculado}`;
}

//---------------------------------------------------------------//

comprar.addEventListener("click", comprarCarrito);
async function comprarCarrito() {

    const resultado = await Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Usted va a comprar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.remove("disabled");
    }
}