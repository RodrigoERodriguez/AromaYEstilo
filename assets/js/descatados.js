document.addEventListener('DOMContentLoaded', function() {
    let productos = {
        ingresos: [],
        hombre: [],
        mujer: [],
        infancia: [],
        hogar: [],
    };

    const contenedorProductosIngresos = document.querySelector("#main__contenedor-ingresos");
    const contenedorProductosHombre = document.querySelector("#main__contenedor-hombre");
    const contenedorProductosMujer = document.querySelector("#main__contenedor-mujer");
    const contenedorProductosInfancia = document.querySelector("#main__contenedor-infancia");
    const contenedorProductosHogar = document.querySelector("#main__contenedor-hogar");

    fetch("../assets/data/destacados.json")
        .then(response => response.json())
        .then(data => {
            productos.ingresos = data.ingresos;
            productos.hombre = data.hombre;
            productos.mujer = data.mujer;
            productos.infancia = data.infancia;
            productos.hogar = data.hogar;

            cargarProductos(productos.ingresos, contenedorProductosIngresos);
            cargarProductos(productos.hombre, contenedorProductosHombre);
            cargarProductos(productos.mujer, contenedorProductosMujer);
            cargarProductos(productos.infancia, contenedorProductosInfancia);
            cargarProductos(productos.hogar, contenedorProductosHogar);
        });

    function cargarProductos(productosElegidos, contenedor) {
        contenedor.innerHTML = "";

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

            contenedor.appendChild(div);
        });
    }
});
