CREATE DATABASE hackinions;

USE hackinions;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(20),
    bio VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hackent(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email) VALUES 
("Carlos", "Lopez", "lopez0@google.com"), 
("Maria", "Suarez", "suarez0@google.com"),
("Carla","gimenez", "gimenez0@google.com"),
("Mariana", "fonseca", "fonseca0@google.com"),
("Jose", "Mijarez", "mijarez0@google.net");


