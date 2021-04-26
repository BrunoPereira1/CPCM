DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS funcao; 

CREATE TABLE funcao (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  funcao varchar(50) NOT NULL,
  CONSTRAINT pk_funcao PRIMARY KEY (id)  
);
INSERT INTO funcao (funcao) VALUES ('COORDENADOR');
INSERT INTO funcao (funcao) VALUES ('MEDIADOR');
INSERT INTO funcao (funcao) VALUES ('ADVOGADO');
INSERT INTO funcao (funcao) VALUES ('SECRETÁRIO');


CREATE TABLE usuario (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(5000),  
  fone VARCHAR(15),
  email VARCHAR(2000),
  login VARCHAR(100),
  senha VARCHAR(100),
  ativo ENUM('S','N') DEFAULT 'S',
  id_funcao INT(10) UNSIGNED NOT NULL,
  CONSTRAINT pk_usuario PRIMARY KEY (id) ,
  CONSTRAINT uk_usuario UNIQUE (login),
  CONSTRAINT fk_funcao FOREIGN KEY (id_funcao) REFERENCES funcao(id)
);

