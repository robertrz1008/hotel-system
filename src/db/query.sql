-- Active: 1700335799467@@127.0.0.1@3300@hoteldb
create table clientes(
    id int AUTO_INCREMENT,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) not NULL,
    direccion VARCHAR(45) DEFAULT "desconocido",
    telefono VARCHAR(20) NOT NULL UNIQUE, 
    PRIMARY KEY(id)
)


create Table habitaciones(
    id int AUTO_INCREMENT,
    descripcion VARCHAR(50) not null,
    montoDia DOUBLE(10,1) not NULL,
    observacion VARCHAR(35) NOT NULL,
    PRIMARY KEY(id)
);

CREATE Table servicios(
    id int AUTO_INCREMENT,
    descripcion VARCHAR(50) not null,
    monto DOUBLE(10,1) not NULL,
    observacion VARCHAR(35) NOT NULL,
    PRIMARY KEY(id)
);

create table estadias(
    id int AUTO_INCREMENT,
    cli_id int NOT NULL,
    hab_id int not null,
    entrada TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
    total DOUBLE(10,1) not NULL, 
    salida TIMESTAMP,
    estado int not null,
    observacion varchar(100),
    Foreign Key (cli_id) REFERENCES clientes(id),
    Foreign Key (hab_id) REFERENCES habitaciones(id),
    PRIMARY KEY(id)
);


create table detalles(
    id int AUTO_INCREMENT,
    estadia_id int NOT NULL,
    servicio_id int NOT NULL,
    costo DOUBLE(10,1) NOT null,
    subtotal DOUBLE(10,1) not NULL, 
    cantidad int,
    Foreign Key (servicio_id) REFERENCES servicios(id),
    PRIMARY KEY(id)
);

create TABLE configuracion(
    id int AUTO_INCREMENT,
    empresa VARCHAR(45) not NULL,
    telefono VARCHAR(45) NOT NULL,
    direccion VARCHAR(45) NOT NULL,
    PRIMARY key(id)
);