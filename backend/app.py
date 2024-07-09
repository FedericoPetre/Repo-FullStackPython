from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

FILES_FOLDER = '/home/feddupetre/webHDTech/static/imagenes' #Directorio estático donde vamos a guardar las imágenes
app.config['FILES_FOLDER'] = FILES_FOLDER
DOMAIN = 'https://feddupetre.pythonanywhere.com'  # Dominio de pythonanywhere

def conectarABaseDeDatos():
    '''
    Devuelve la conexión a la base de datos
    '''
    db = mysql.connector.connect(
        host='feddupetre.mysql.pythonanywhere-services.com',
        user='feddupetre',
        password='hdtech2024',
        database='feddupetre$hdtech'
    )
    return db


def agregarProducto(nombre_producto, numero_de_serie, path_imagen, precio, estadoStock):
    '''
    Agrega un registro en la base de datos, con los argumentos pasados por parámetro
    '''
    retorno = 0
    try:
        db = conectarABaseDeDatos()
       
        cursor = db.cursor()
       
        consulta = "INSERT INTO productos (src_imagen_producto, alt_imagen_producto, precio_producto, estado_producto, nombre_producto, numero_de_serie) VALUES (%s, %s, %s, %s, %s, %s)"
       
        valores = (path_imagen, f"Imagen de {nombre_producto}", precio, estadoStock, nombre_producto, numero_de_serie)
       
        #ejecutamos la consulta
        cursor.execute(consulta, valores)

        #guardar cambios en la base de datos
        db.commit()

        #recuperar el último id insertado
        retorno = cursor.lastrowid

        #cerrar la conexión al cursor
        cursor.close()

        #cerrar la conexión a la base de datos
        db.close()
    except Exception as e:
        #captura posible excepción
        retorno = str(e)
    finally:
        #devolver el resultado
        return retorno


def listarProductos():
    '''
    Devuelve todos los registros de la tabla productos
    '''
    # array productos vacío
    productos = []
    try:
        db = conectarABaseDeDatos()
        cursor = db.cursor()
        consulta = "SELECT * FROM productos"
        cursor.execute(consulta)

        #recuperar todos los registros
        productos = cursor.fetchall()

        #cerrar la conexión al cursor
        cursor.close()

        #cerrar la conexión a la bd
        db.close()
    except Exception as e:
        productos = -1
    return productos


def eliminarProducto(id_producto):
    '''
    Elimina un producto de la base de datos, coincidente con el id pasado por parámetro
    '''
    retorno = 0
    try:
        db = conectarABaseDeDatos()
        cursor = db.cursor()
        consulta = "DELETE FROM productos WHERE id_producto = %s"
        
        valor = (id_producto,)
        
        # ejecuta la consulta de eliminación
        cursor.execute(consulta, valor) 

        # guardar cambios en la base de datos
        db.commit()

        # indicar que la eliminación fue exitosa
        retorno = 1

        # cerrar la conexión al cursor
        cursor.close()

        # cerrar la conexión a la base de datos
        db.close()
    except Exception as e:
        raise e
    finally:
        return retorno


def modificarProducto(nombre_producto, numero_de_serie, path_imagen, precio, estadoStock, id_producto):
    '''
    Para modificar el producto con el id pasado por parámetro
    id_producto (es el id del producto a ser modificado)
    '''
    retorno = 0
    try:
        db = conectarABaseDeDatos()
       
        cursor = db.cursor()

        consulta = ""
        valores = ""

        if(path_imagen != ""):
            consulta = "UPDATE productos SET src_imagen_producto = %s, alt_imagen_producto = %s, precio_producto = %s, estado_producto = %s, nombre_producto =%s, numero_de_serie = %s WHERE id_producto = %s"
            valores = (path_imagen, f"Imagen de {nombre_producto}", precio, estadoStock, nombre_producto, numero_de_serie, id_producto)
        else:
            consulta = "UPDATE productos SET alt_imagen_producto = %s, precio_producto = %s, estado_producto = %s, nombre_producto =%s, numero_de_serie = %s WHERE id_producto = %s"
            valores = (f"Imagen de {nombre_producto}", precio, estadoStock, nombre_producto, numero_de_serie, id_producto)  
       
        #ejecutamos la consulta
        cursor.execute(consulta, valores)

        #guardar cambios en la base de datos
        db.commit()

        #recuperar cuantos registros se modificaron
        retorno = cursor.rowcount

        #cerrar la conexión al cursor
        cursor.close()

        #cerrar la conexión a la base de datos
        db.close()
    except Exception as e:
        raise e
    finally:
        #devolver el resultado
        return retorno


def consultarProducto(id_producto):
    '''
    Para recuperar el producto coincidente con el id pasado por parámetro.
    '''
    productos = 0
    try:
        db = conectarABaseDeDatos()
        cursor = db.cursor()
        consulta = "SELECT * FROM productos WHERE id_producto = (%s)"
        valor = (id_producto,)
        cursor.execute(consulta, valor)

        # recuperar todos los registros
        productos = cursor.fetchall()

        if len(productos) > 0:
            productos = productos[0]

        # cerrar la conexión al cursor
        cursor.close()

        # cerrar la conexión a la bd
        db.close()
    except Exception as e:
        raise e

    return productos


def guardarImagen(imagen):
    '''
    Para guardar la imagen en el path ingresado por parámetro.
    Devuelve la url donde se guardó la imagen -en formato string-
    imagen (la imagen a guardar)
    '''
    urlImagen = ""
    if imagen:
        filename = secure_filename(imagen.filename)
        #guarda la imagen en el directorio estático
        imagen.save(os.path.join(app.config['FILES_FOLDER'], filename))

        #generar la url a la imagen en el directorio estático
        urlImagen = f"{DOMAIN}/static/imagenes/{filename}"

    return urlImagen


def eliminarImagen(pathImagen):
    '''
    Para eliminar la imagen que se encuentra en el path ingresado por parámetro
    '''
    flagElimino = False
    if os.path.exists(pathImagen):
        os.remove(pathImagen)
        flagElimino = True

    return flagElimino


def devolverRutaOriginalImagen(urlImagen):
    '''
    Recibe la url de la imagen y devuelve el path original donde se encuentra alojada
    '''
    nombreImagen = urlImagen.split('/')[-1]
    ruta_imagen = os.path.join(app.config['FILES_FOLDER'], nombreImagen)

    return ruta_imagen


@app.route('/agregar_producto', methods=['POST'])
def agregar_producto():
    '''
    Para agregar un producto a la base de datos.
    El formulario que recibe debe tener los siguientes campos:
    nombreProducto, numeroDeSerie, imagen, precioProducto, estadoStock
    Devuelve un objeto con el atributo "mensaje" y además el valor de estado.
    ''' 
    try:
        nombreProducto = request.form['nombreProducto']
        numeroDeSerie = request.form['numeroDeSerie']
        imagen = request.files['imagen']
        precio = request.form['precioProducto']
        estadoStock = request.form['estadoStock']
        
        urlImagen = guardarImagen(imagen)

        retorno = agregarProducto(nombreProducto, numeroDeSerie, urlImagen, precio, estadoStock)
        
        if retorno != 0:
            return jsonify({"mensaje":"Producto agregado con éxito"}), 200
        else:
            return jsonify({"mensaje":f"Error: {retorno}"}), 500
    except Exception as e:
        error = str(e)
        return jsonify({"mensaje": error}),500


@app.route('/listar_productos', methods=['GET'])
def listar_productos():
    '''
    Devuelve un array de objetos json de los registros guardados en la base de datos.
    '''
    try:
        productos = listarProductos()
        if productos != 0 and productos != -1:
            productos_list = []
            for producto in productos:
                producto_dict = {
                    'id_producto': producto[0],
                    'src_imagen_producto': producto[1],
                    'alt_imagen_producto': producto[2],
                    'precio_producto': producto[3],
                    'estado_producto': producto[4],
                    'nombre_producto': producto[5],
                    'numero_de_serie': producto[6]
                }
                productos_list.append(producto_dict)
            return jsonify(productos_list), 200
        else:
            return jsonify({"mensaje":"Error, no se han encontrado productos"}), 404
    except Exception as e:
        error = str(e)
        return jsonify({"mensaje": error}), 500
    

@app.route('/eliminar_productos/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    '''
    Para eliminar un producto a la base de datos, correspondiente al id recibido por parámetro
    ''' 
    try:
        producto = consultarProducto(id)

        if producto != 0:
            producto = {
                'id_producto': producto[0],
                'src_imagen_producto': producto[1],
                'alt_imagen_producto': producto[2],
                'precio_producto': producto[3],
                'estado_producto': producto[4],
                'nombre_producto': producto[5],
                'numero_de_serie': producto[6]
            }
            
            # eliminar la imagen asociada al registro
            ruta_imagen = devolverRutaOriginalImagen(producto['src_imagen_producto'])
            
            flagEliminoRegistro = eliminarProducto(id)
            flagEliminoImagen = eliminarImagen(ruta_imagen)

            mensajeRetorno = ""
            status = 500

            if flagEliminoRegistro and flagEliminoImagen:
                mensajeRetorno = "Producto eliminado exitosamente"
                status = 200
            elif flagEliminoRegistro and not flagEliminoImagen:
                mensajeRetorno = "Se eliminó el registro, pero no la imagen"
            elif not flagEliminoRegistro and flagEliminoImagen:
                mensajeRetorno = "Se eliminó la imagen, pero no el registro"
            else:
                mensajeRetorno = "Error al eliminar el registro y la imagen"

            return jsonify({"mensaje":mensajeRetorno}), status
        else:
            return jsonify({"mensaje":"No se ha encontrado el producto en la base de datos"}), 500
    except Exception as e:
        error = str(e)
        return jsonify({"mensaje": error}), 500


@app.route('/modificar_productos/<int:id>', methods=['PUT'])
def modificar_producto(id):
    '''
    Para modificar el producto con el id especificado en la base de datos
    El formulario que recibe debe tener los siguientes campos:
    nombreProducto, numeroDeSerie, imagen, precioProducto, estadoStock y srcImagenProducto
    Devuelve un objeto con el atributo "mensaje" y además el valor de estado.
    '''
    try:
        nombreProducto = request.form.get('nombreProducto')
        numeroDeSerie = request.form.get('numeroDeSerie')
        imagen = ""
        precio = request.form.get('precioProducto')
        estadoStock = request.form.get('estadoStock')
        srcImagenProducto = request.form.get('srcImagenProducto')

        urlImagen = ""

        if 'imagen' in request.files:
            # eliminar la imagen vieja asociada al registro
            ruta_imagen = devolverRutaOriginalImagen(srcImagenProducto)
            eliminarImagen(ruta_imagen)

            #guardar la nueva y guardas las modificaciones en la base de datos
            imagen = request.files['imagen']
            urlImagen = guardarImagen(imagen)
        
        retorno = modificarProducto(nombreProducto, numeroDeSerie, urlImagen, precio, estadoStock, id)

        if retorno != 0:
            return jsonify({"mensaje":"Producto modificado con éxito"}), 200
        else:
            return jsonify({"mensaje":"No se ha modificado ningún registro"}), 304
            
    except Exception as e:
        error = str(e)
        return jsonify({"mensaje": error}), 500

if __name__ == '__main__':
    app.run(debug=True)
