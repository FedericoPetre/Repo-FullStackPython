from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

#AGREGAR_USUARIO
@app.route('/agregar_usuario', methods=['POST'])
def crear_usuario():
    info = request.json
    db = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = '1234',
        database = 'hdtech'
    )
    
    cursor = db.cursor() 
    cursor.execute('INSERT INTO usuarios(Nombre, Apellido, email, contraseña) VALUES(%s,%s,%s,%s)', (info["n"],info["a"],info["e"],info["c"])) 
    
    db.commit()    
    cursor.close()
    return jsonify({"mensaje": "USUARIO CREADO CON ÉXITO"}) 

if __name__ == '__main__':
    app.run(debug=True) 