create database hdtech;

use hdtech;

create table productos(
	id_producto int (15) primary key auto_increment,
    src_imagen_producto varchar(400) not null,
    alt_imagen_producto varchar(80) not null,
    precio_producto float not null,
    estado_producto varchar(10) not null,
	nombre_producto varchar(100) not null,
    cantidad_producto int);
    

insert into productos (
						   id_producto, 
						   src_imagen_producto, 
                           alt_imagen_producto, 
						   precio_producto,
                           estado_producto,
                           nombre_producto,
                           cantidad_producto) 
                            values 
                          (
                           123456789, 
						   "E:\BRUNO\CURSOS, TALLERES Y SEMINARIOS\CODO A CODO\Repo-FullStackPython-CAC\frontend\src\assets\img\products\apple-watch-41mm-series-8-gps-aluminum-case-with-sport-band-sm.png",
						   'apple-watch-41mm-series-8-gps-aluminum-case-with-sport-band-sm',
                           240000,
                           'En stock',
                           'Apple Watch Series 8 41mm - Aluminum case with Sport Band',
                           100);
		
alter table productos add column id_producto_html varchar(15);