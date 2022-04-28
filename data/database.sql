CREATE DATABASE hackinions;

USE hackinions;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TINYTEXT NOT NULL,
    name VARCHAR(20),
    last_name VARCHAR(20),
    bio VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hackentries(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(250) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE hackvotes(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    vote BOOLEAN NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    hackentries_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hackentries_id) REFERENCES hackentries(id)

);




INSEhackentriesRT INTO hackentries(title, content, user_id)
	VALUES
    ("precio del gas","El precio del gas esta carísimo, bla bla",1),
    ("educación infantil", "Los padres de hoy dejan a los niños bla bla",2);
    

    

