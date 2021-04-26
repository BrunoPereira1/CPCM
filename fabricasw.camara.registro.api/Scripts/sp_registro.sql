DROP PROCEDURE IF EXISTS `sp_registro`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registro`(
  IN tipo ENUM('MEDIAÇÃO', 'ORIENTAÇÃO'),
  IN assunto VARCHAR(500),
  IN mensagem VARCHAR(1000),
  IN nome VARCHAR(500),
  IN fone VARCHAR(15),
  IN email VARCHAR(500),
  IN datahora DATETIME,
  IN observacao VARCHAR(1000),
  IN usuario INT,
  OUT protocolo VARCHAR(100))
BEGIN
  DECLARE uu_id VARCHAR(100);  
  DECLARE id_usuario INT;
  
  SET uu_id = UUID();
  SET id_usuario = (SELECT fn_validarsuario(usuario));
  
  INSERT INTO `agenda` 
	(`status`, `datahora`, `observacao`, `id_usuario`, `uu_id`)
  VALUES 
	('ABERTO', datahora, observacao, id_usuario, uu_id);
  
  INSERT INTO `registro`
	(`tipo`, `assunto`, `mensagem`, `nome`,  `fone`, `email`, `uu_id`) 
  VALUES
	(tipo , assunto, mensagem, nome, fone, email, uu_id);
  
  SET protocolo = uu_id;
  SELECT protocolo;
END$$
DELIMITER ;
