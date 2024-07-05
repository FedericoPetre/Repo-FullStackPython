export default class Producto{
    srcImagenProducto;
    altImagenProducto;
    precioProducto;
    estadoProducto; //esto para indicar si hay stock o no
    nombreProducto;
    idProducto;

    /**
     * 
     * @param {*} srcImagenProducto El path de la imagen del producto
     * @param {*} altImagenProducto Lo que se mostrará en caso de que la imagen no se encuentre
     * @param {*} precioProducto El precio del producto
     * @param {*} estadoProducto El estado del producto (En Stock o Sin Stock)
     * @param {*} nombreProducto El nombre del producto
     */
    constructor(srcImagenProducto, altImagenProducto, precioProducto, estadoProducto, nombreProducto, idProducto){
        this.srcImagenProducto = srcImagenProducto;
        this.altImagenProducto = altImagenProducto;
        this.precioProducto = precioProducto;
        this.estadoProducto = estadoProducto;
        this.nombreProducto = nombreProducto;
        this.idProducto = idProducto;
    }

    /**
     * Crea una card HTML con los valores de la instancia del producto actual
     */
    toCardHTMLElement(){
        let cardHTML = `
        <div class="product" id="${this.idProducto}" productoJson='${JSON.stringify(this)}' >
			<div class="product-img">
				<img class="imagenDelProducto" src="${this.srcImagenProducto}" alt="${this.altImagenProducto}" />
			</div>
						
            <div class="products-info">
				<!-- Top-->
				<div class="product-price">
					<span> ${this.precioProducto} USD $</span>
					<p>${this.estadoProducto}</p>
				</div>
							
                <!-- Mid-->
				<div class="product-name">
					<p>${this.nombreProducto}</p>
				</div>
				
                <!-- Bot-->
					<div class="product-bot-modificar">
						<a href="./modificar_producto.html" onclick="modificarOEliminarProducto('${this.idProducto}')" class="btn-comprar">MODIFICAR PRODUCTO</a>
					</div>
						
                <div class="product-bot-borrar">
					<a href="borrar_producto.html" onclick="modificarOEliminarProducto('${this.idProducto}')" class="btn-comprar"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="trashcan"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" fill="currentColor"/></svg></a>
				</div>
			</div>
		</div>`;

        return cardHTML;
    }
}