import Producto from "./producto.js";

document.addEventListener('DOMContentLoaded', (event) => {
    let productoJSON = localStorage.getItem('productoAModificar');
    if (productoJSON != null) {
        let producto = JSON.parse(productoJSON);
        
        console.log('Producto a modificar:', producto);
        // Aquí puedes continuar con la lógica para modificar el producto
        // Por ejemplo, poblar los campos de un formulario con los datos del producto

        document.getElementById("txtNombreProducto").value = producto.nombreProducto;
        document.getElementById("txtNumeroSerie").value = producto.idProducto;
        document.getElementById("idImagenProducto").innerHTML = `<img class="imagenDelProducto" src="${producto.srcImagenProducto}" alt="${producto.altImagenProducto}"/>`;
        document.getElementById("txtPrecioProducto").value = producto.precioProducto;
        document.getElementById("txtStock").value = producto.estadoProducto;

        localStorage.clear();
    } else {
        console.log('No se encontró ningún producto a modificar');
    }
});

function cargarDatosEnFormulario(producto){

}
