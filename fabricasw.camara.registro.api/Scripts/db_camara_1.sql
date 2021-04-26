DROP TABLE IF EXISTS agenda_log; 
DROP TABLE IF EXISTS agenda; 
DROP TABLE IF EXISTS registro_log;
DROP TABLE IF EXISTS registro;

CREATE TABLE registro (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  tipo ENUM('MEDIAÇÃO', 'ORIENTAÇÃO') NOT NULL,
  assunto VARCHAR(500) NOT NULL,
  mensagem VARCHAR(1000) NOT NULL,
  nome VARCHAR(500) NOT NULL,
  fone VARCHAR(15) DEFAULT NULL,
  email VARCHAR(500) DEFAULT NULL,  
  registrado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  uu_id VARCHAR(100) DEFAULT NULL,
  CONSTRAINT pk_registro PRIMARY KEY (id)  
);

CREATE TABLE agenda (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  id_registro INT(10) UNSIGNED DEFAULT NULL,    
  status ENUM('ABERTO', 'VERIFICADO', 'REALIZADO', 'PROCESSADO', 'ENCERRADO', 'CANCELADO') NOT NULL,
  datahora DATETIME DEFAULT NULL,
  observacao VARCHAR(1000) DEFAULT NULL,
  id_usuario INT(10) UNSIGNED DEFAULT NULL,
  uu_id VARCHAR(100) DEFAULT NULL,  
  CONSTRAINT pk_agenda PRIMARY KEY (id) ,
  CONSTRAINT fk_registro_1 FOREIGN KEY (id_registro) REFERENCES registro(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_registro_2 FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE agenda_log (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,  
  id_agenda INT(10) UNSIGNED DEFAULT NULL,   
  datahora DATETIME DEFAULT CURRENT_TIMESTAMP,  
  ocorrencia TEXT DEFAULT NULL,
  CONSTRAINT pk_agenda_log PRIMARY KEY (id),
  CONSTRAINT fk_agenda_log FOREIGN KEY (id_agenda) REFERENCES agenda(id) ON UPDATE CASCADE ON DELETE CASCADE  
);

CREATE TABLE registro_log (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,  
  id_registro INT(10) UNSIGNED DEFAULT NULL,   
  id_usuario INT(10) UNSIGNED DEFAULT NULL,
  datahora DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_registro_log PRIMARY KEY (id),
  CONSTRAINT fk_registro_log_1 FOREIGN KEY (id_registro) REFERENCES registro(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_registro_log_2 FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE
);



