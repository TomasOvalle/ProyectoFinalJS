const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("mangas"));
    if (productos && productos.length > 0) {
    productos.forEach((producto) => {
        const nuevoManga = document.createElement("div");
        nuevoManga.classList = "tarjeta-producto";
        nuevoManga.innerHTML = `  
        <img src="./img/productos/${producto.id}.jpg">
        <figcaption>${producto.editorial}</figcaption>  
        <figcaption>${producto.nombre}</figcaption>
        <figcaption>$${producto.precio}</figcaption>
        <div class="boton">
            <button class="boton-menos">-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button class="boton-mas">+</button>
        </div>
    `;
    contenedorTarjetas.appendChild(nuevoManga);
    nuevoManga
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
            const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
            cantidadElement.innerText = restarAlCarrito(producto);
            crearTarjetasProductosCarrito();
            actualizarTotales();
        });
    nuevoManga
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
            const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
            cantidadElement.innerText = agregarAlCarrito(producto);
            actualizarTotales();
        });
    });
    }
    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();


function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("mangas"));
    let cantidad = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
    productos.forEach((producto) => {
        cantidad += producto.cantidad;
        precio += producto.precio * producto.cantidad;
    });
}
cantidadElement.innerText = cantidad;
precioElement.innerText = precio;
    if(precio === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

document.getElementById("reiniciar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
});


function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("mangas"));
    carritoVacioElement.classList.toggle("escondido", productos);
    totalesContainer.classList.toggle("escondido", !productos);
}