import mysql.connector

def conectar():
    #mis credenciales
    connection = mysql.connector.connect(
        host = "localhost",
        user = 'root',
        password = "1234",
        database = "hdtech",
    )
    return connection    

def desconectar(connection):
    if connection:
        connection.close()

def agregar_usuario(nombre, apellido, email, contraseña):
    try:
        connection = conectar()
        cursor = connection.cursor()
        
        query = "INSERT INTO usuarios (Nombre, Apellido, email, contraseña) VALUES (%s, %s, %s, %s)"
        datos_usuario = (nombre, apellido, email, contraseña)
        cursor.execute(query, datos_usuario)
        
        connection.commit()
        cursor.close()
    
    except mysql.connector.Error as error:
        print("Error al agregar el usuario: ", error)
    
    finally:
        desconectar(connection)
        

