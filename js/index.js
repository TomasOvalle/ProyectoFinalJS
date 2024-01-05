const contenedorTarjetas = document.getElementById("productos-container");
const URL = "https://6588d05b324d417152583aa1.mockapi.io/productos"


async function obtenerProductos() {
    try {    
        const respuesta = await fetch(URL);

        const productos = await respuesta.json();

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('tarjeta-producto');
            card.innerHTML = `
            <img src="./img/productos/${producto.id}.jpg">
            <figcaption>${producto.editorial}</figcaption>
            <figcaption>${producto.nombre}</figcaption>
            <figcaption>$${producto.precio}</figcaption>
            <button>Agregar al carrito</button>`;
            document.getElementById("productos-container").appendChild(card);
            card.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
        });
    } catch (error) {
        contenedorTarjetas.innerHTML = crearCardError()
    }
}

obtenerProductos();


function crearCardError() {
    return `<div class="div-card-error">
            <div class="leyenda-error">Lo sentimos, hubo un problema al cargar los productos. Por favor, inténtalo de nuevo más tarde o contacta a soporte para obtener ayuda.</div>
                </div>`
}

crearCardError();