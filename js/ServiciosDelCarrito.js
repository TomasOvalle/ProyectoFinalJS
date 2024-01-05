const cuentaCarritoElement = document.getElementById("cuenta-carrito");
const ButtonTerminarComprar = document.getElementById("TerminarCompra");

function agregarAlCarrito(producto){
    let memoria = JSON.parse(localStorage.getItem("mangas"));
    let cantidadProductoFinal;

    if(!memoria || memoria.length === 0) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem("mangas",JSON.stringify([nuevoProducto]));
        actualizarNumeroCarrito();
        cantidadProductoFinal = 1;
}
    else {
        const indiceProducto = memoria.findIndex(manga => manga.id === producto.id)
        const nuevaMemoria = memoria;
            if(indiceProducto === -1){
                const nuevoProducto = getNuevoProductoParaMemoria(producto);
                nuevaMemoria.push(nuevoProducto);
                cantidadProductoFinal = 1;
                } else {
                    nuevaMemoria[indiceProducto].cantidad ++;
                    cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
                }
    localStorage.setItem("mangas",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
    }
}

function restarAlCarrito(producto){
    let memoria = JSON.parse(localStorage.getItem("mangas"));
    let cantidadProductoFinal = 0;
    const indiceProducto = memoria.findIndex(manga => manga.id === producto.id)
    let nuevaMemoria = memoria;
    nuevaMemoria[indiceProducto].cantidad--;
    cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
        if(cantidadProductoFinal === 0){
            nuevaMemoria.splice(indiceProducto,1)
            };
    localStorage.setItem("mangas",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
}

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

function actualizarNumeroCarrito(){
    let cuenta = 0;
    const memoria = JSON.parse(localStorage.getItem("mangas"));
    if(memoria && memoria.length > 0){
        cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
        return cuentaCarritoElement.innerText = cuenta;
    }
    cuentaCarritoElement.innerText = 0;
}

function reiniciarCarrito(){
    localStorage.removeItem("mangas");
    actualizarNumeroCarrito();
}


actualizarNumeroCarrito();


ButtonTerminarComprar.addEventListener("click", () => {
    Swal.fire({
        title: "¿Deseas finalizar la compra?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Por ahora no"
    })
    .then((result) =>{
        if (result.isConfirmed) {
            Swal.fire({
                text: "¡Gracias por tu compra y preferencia! Valoramos tu elección y esperamos que disfrutes tu adquisición. ¡Que tengas un excelente día!",
                showConfirmButton: false,
                icon: "info",
                timer: 2500
            })
        } else if (result.isDenied) {
            Swal.fire({
                text: "¿Por qué detenerte aquí? ¡Descubre más opciones increíbles y completa tu carrito con productos que te encantarán! ¡Sigue explorando y añade más artículos para aprovechar al máximo tu compra!",
                icon: "info",
                timer: 2500
            })
        }
    });
})