DROP PROCEDURE IF EXISTS `sp_agendalog`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agendalog`(    
  IN id_agenda INT,
  IN ocorrencia TEXT)
BEGIN
	INSERT INTO 
		agenda_log (`id_agenda`, `ocorrencia`) 
	VALUES 
		(id_agenda, ocorrencia); 
END$$
DELIMITER ;
