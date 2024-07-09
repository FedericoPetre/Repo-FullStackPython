import Producto from "./producto.js";

document.addEventListener('DOMContentLoaded', (event) => {
    const URL = 'https://feddupetre.pythonanywhere.com/eliminar_productos/';
    let arrayIds = ["txtNombreProducto", "txtNumeroSerie", "idImagenProducto", "txtPrecioProducto", "txtStock"];
    for(let id of arrayIds){
        switch(id){
            case "txtNombreProducto":
                var nombreProductoHTML = document.getElementById(id);
                nombreProductoHTML.addEventListener('change',(e)=>{
                    cambiarEstilo(id, true);  
                })
                break;
            case "txtNumeroSerie":
                var numeroSerieHTML = document.getElementById(id);
                numeroSerieHTML.addEventListener('change',(e)=>{
                    cambiarEstilo(id, true);  
                })
                break;
            case "idImagenProducto":
                var imagenProductoHTML = document.getElementById(id);
                break;
            case "txtStock":
                var estadoProductoHTML = document.getElementById(id);
                estadoProductoHTML.addEventListener('change',(e)=>{
                    cambiarEstilo(id, true);  
                })
                break;
            case "txtPrecioProducto":
                var precioProductoHMTL = document.getElementById(id);
                precioProductoHMTL.addEventListener('change',(e)=>{
                    cambiarEstilo(id, true);  
                })
                break;
                default:
                    break;
        }
    }     


    let productoJSON = localStorage.getItem('productoAModificar');

    if(productoJSON != null){
        var producto = JSON.parse(productoJSON);

        nombreProductoHTML.value = producto.nombreProducto;
        numeroSerieHTML.value = producto.numeroDeSerie;
        imagenProductoHTML.src=`${producto.srcImagenProducto}`;
        imagenProductoHTML.alt=`${producto.altImagenProducto}`;
        precioProductoHMTL.value = producto.precioProducto;
        estadoProductoHTML.value = producto.estadoProducto;
    }
    
    localStorage.clear();

    document.getElementById("btnGuardar").addEventListener('click',(e)=>{
        if(validarSiElFormularioEsValido(arrayIds)){
            //El formulario es válido, se envía todo al backend
            const URL_COMPLETA = URL + producto.idProducto;
            fetch(URL_COMPLETA, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                let mensaje = "";
                if(data.mensaje) {
                    mensaje = data.mensaje;
                } else {
                    mensaje = "Ha ocurrido algún error al eliminar el producto";
                }
                alert(mensaje);
            })
            .catch(error => {
                alert("Error: " + error);
            })
            .finally(() => {
                // Limpiar formulario
                limpiarFormulario();
            });
        }
    })

});

/**
 * Determina si el formulario es válido o no, para enviar los datos al backend.
 * @param {*} arrayIds lista de los ids asociaodos a los campos del formulario
 */
function validarSiElFormularioEsValido(arrayIds){
    let diccionionario =[]
    for(let id of arrayIds){
        if(id != "idImagenProducto"){
            diccionionario.push({"id":id, "valor":document.getElementById(id).value});
        }
    }

    return validarCamposFormulario(diccionionario)
}
/**
 * 
 * @param {*} arrayDiccionarioIdsYValores 
 * @returns 
 */
function validarCamposFormulario(arrayDiccionarioIdsYValores){
    let arrayValidaciones = [];

    for(let obj of arrayDiccionarioIdsYValores){
        let flagEsValido = validarCampo(obj.valor);
        arrayValidaciones.push(flagEsValido)

        if(!flagEsValido){
            cambiarEstilo(obj.id, flagEsValido);
        }
    }
    
    let flagEsValido = true;

    for(let validacion of arrayValidaciones){
        if(!validacion){
            flagEsValido = false;
            break;
        }
    }

    return flagEsValido;
}

/**
 * 
 * @param {*} valorCampo Un valor asocioado a un campo
 * @returns true si el valor pasado por parámetro es no nulo y tampoco es vacío. Caso contrario retorna flase
 */
function validarCampo(valorCampo){
    let flagEsValido = false;
    if(valorCampo != null &&valorCampo != ""){
        flagEsValido = true;
    }
    return flagEsValido;
}

/**
 * 
 * @param {*} id El id del input del formulario
 * @param {*} flagEsValido si el contenido del formulario es válido o no. Si no es válido cambia el estilo a error. Caso contrario lo retorna al estilo original.
 */
function cambiarEstilo(id, flagEsValido){
    switch(id){
        case "txtNombreProducto":
            if(!flagEsValido){
                document.getElementById(id).placeholder = "Por favor, ingresá el nombre del producto"
                document.getElementById(id).style.border = "1px solid red"
            }else{
                document.getElementById(id).style.border = "1px solid #c9c8c8"
                document.getElementById(id).placeholder = "Nombre de producto"
            }
            break;
        case "txtNumeroSerie":
            if(!flagEsValido){
                document.getElementById(id).placeholder = "Por favor, ingresá el número de serie"
                document.getElementById(id).style.border = "1px solid red"
            }else{
                document.getElementById(id).style.border = "1px solid #c9c8c8"
                document.getElementById(id).placeholder = "Número de serie"
            }
            break;
        case "txtStock":
            if(!flagEsValido){
                document.getElementById(id).placeholder = "Por favor, ingresá el estado del producto"
                document.getElementById(id).style.border = "1px solid red"
            }else{
                document.getElementById(id).style.border = "1px solid #c9c8c8"
                document.getElementById(id).placeholder = "Stock"
            }
            break;
        case "txtPrecioProducto":
            if(!flagEsValido){
                document.getElementById(id).placeholder = "Por favor, ingresá el precio del producto"
                document.getElementById(id).style.border = "1px solid red"
            }else{
                document.getElementById(id).style.border = "1px solid #c9c8c8"
                document.getElementById(id).placeholder = "Precio"
            }
            break;
        default:
            break;
    }
}

function limpiarFormulario(){

    document.getElementById("txtNombreProducto").value = "";
    document.getElementById("txtNumeroSerie").value = "";
    let imagenProducto = document.getElementById("idImagenProducto");
    imagenProducto.src = "./src/assets/img/producto-generico.jpg";
    imagenProducto.alt = "Producto Genérico";
    document.getElementById("txtPrecioProducto").value = "";
    document.getElementById("txtStock").value = "";
    document.getElementById("idInputImage").value = "";
}

