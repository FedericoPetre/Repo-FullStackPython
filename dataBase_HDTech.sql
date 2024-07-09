create database hdtech;

use hdtech;

create table productos(
	  id_producto INT PRIMARY KEY AUTO_INCREMENT,
    src_imagen_producto VARCHAR(400) NOT NULL,
    alt_imagen_producto VARCHAR(400) NOT NULL,
    precio_producto FLOAT NOT NULL,
    estado_producto VARCHAR(150) NOT NULL,
	  nombre_producto VARCHAR(400) NOT NULL,
    numero_de_serie VARCHAR(400) NOT NULL);

CREATE TABLE usuarios (
  nombre VARCHAR(300) NOT NULL,
  apellido VARCHAR(300) NOT NULL,
  email VARCHAR(300) NOT NULL PRIMARY KEY,
  contraseña VARCHAR(300) NOT NULL
);
