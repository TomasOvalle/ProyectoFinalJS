const contenedorTarjetas = document.getElementById("productos-container");
//const Buscar = document.getElementById("buscar");
const URL = 'js/novelas.json'

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
        console.error('Error al obtener los productos:', error);
    }
}

obtenerProductos();

/*
Buscar.addEventListener("search", () => {
    let param = Buscar.ariaValueMax.trim().toLowerCase()
    let Resultado = productos.filter((producto) => producto.nombre.toLowerCase().includes(param))
    obtenerProductos(Resultado)
})*/