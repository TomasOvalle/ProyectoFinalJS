const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevoManga = document.createElement("div");
        nuevoManga.classList = "tarjeta-producto"
        nuevoManga.innerHTML = `
        <img src="./img/productos/${producto.id}.jpg">
        <figcaption>${producto.editorial}</figcaption>
        <figcaption>${producto.nombre}</figcaption>
        <figcaption>$${producto.precio}</figcaption>
        <button>Agregar al carrito</button>`
        contenedorTarjetas.appendChild(nuevoManga);
        nuevoManga.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
    });
}
crearTarjetasProductosInicio(Mangas);