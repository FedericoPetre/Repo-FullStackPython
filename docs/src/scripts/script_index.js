import Producto from "./producto.js";

document.addEventListener('DOMContentLoaded', (event) => {
    cargarProductos();
    console.log('El DOM está completamente cargado y listo para ser manipulado.');
});

/**
 * Crea los productos y el html dinámico y lo inserta en el index.html
 */
function cargarProductos(){
    const URL = 'https://feddupetre.pythonanywhere.com/listar_productos';

    fetch(URL ,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        let productos = [];
        /*
        productos.push(new Producto("./src/assets/img/products/macbook-pro-14-mphh3-m2-pro-512-gb-silver-removebg-preview.png", "Macbook Pro 14 [MPHH3] M2 Pro - 512 GB - Silver", 1500.00, "En Stock",'Macbook Pro 14" MPHH3 M2 Pro - 512 GB - Silver', "Serie 1", 1));
        productos.push(new Producto("./src/assets/img/products/macbook-air-153-retina-mqkp3-m2-chip-256-gb-silver-removebg-preview.png","MacBook Air 15.3 Retina [MQKR3] M2 Chip", 1500.00, "En Stock",'MacBoook Air 15" MQKR2 M2 Chip - 256GB - Silver', "Serie 2", 2))
        productos.push(new Producto("./src/assets/img/products/macbook-air-136-retina-mly33-m2-chip-256-gb-midnight-removebg-preview.png", "MacBook Air 13.6 Retina [MLY33] M2 Chip 256 GB - Midnight", 1500.00, "En Stock",'MacBook Air 13.6" Retina [MLY33] M2 Chip 256 GB - Midnight', "Serie 3", 3))
        productos.push(new Producto("./src/assets/img/products/ipad-109-10th-generation-64-gb-wifi.png", "iPad 10.9 (10th generation) - 64 GB Wi‑Fi", 550.00, "En Stock",'iPad 10.9" (10th generation) - 64 GB Wi‑Fi', "Serie 4", 4));
        productos.push(new Producto("./src/assets/img/products/ipad-air-5-109-64-gb-wi-fi-removebg-preview.png", "iPad Air 5 10.9 - 64 GB - Wi-Fi", 670.00, "En Stock",'iPad Air 5 10.9" - 64 GB - Wi-Fi', "Serie 5", 5))
        productos.push(new Producto("./src/assets/img/products/apple-watch-41mm-series-8-gps-aluminum-case-with-sport-band-sm.png", "Apple Watch Series 8 41mm - Aluminum case with Sport Band - S/M", 420.00, "En Stock",'Apple Watch Series 8 41mm - Aluminum case with Sport Band', "Serie 6", 6));
        */

        for(let producto of data){
            productos.push(new Producto(producto.src_imagen_producto, producto.alt_imagen_producto, producto.precio_producto, producto.estado_producto, producto.nombre_producto, producto.numero_de_serie, producto.id_producto))
        }

        let htmlElementProductos = "";
        for(let p of productos){
            htmlElementProductos += p.toCardHTMLElement();
        }
        
        document.getElementById("contenedorCardsProductos").innerHTML = htmlElementProductos;

    })
    .catch(error => {
        alert("Error: " + error);
    })
    .finally(() => {
        // Limpiar formulario
        limpiarFormulario();
    });
}

export function modificarOEliminarProducto(idtxtProducto) {
    let productoJSON = document.getElementById(idtxtProducto).getAttribute("productoJson");

    if (productoJSON != null) {
        //guarda en localStorage el producto en string a ser modificado
        localStorage.setItem('productoAModificar', productoJSON);
    }
}

// Asignar la función al objeto window para hacerla accesible globalmente
window.modificarOEliminarProducto = modificarOEliminarProducto;
