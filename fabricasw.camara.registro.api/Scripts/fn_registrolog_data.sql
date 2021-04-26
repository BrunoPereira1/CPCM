DROP FUNCTION IF EXISTS `fn_registrolog_data`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_registrolog_data`(id_registro INT) RETURNS datetime
    DETERMINISTIC
BEGIN	
	DECLARE registro_data datetime DEFAULT CURRENT_TIMESTAMP(); 
    SELECT 
		MAX(`registro_log`.`datahora`) 
    INTO
		registro_data
    FROM 
		`registro_log` 
    WHERE 
		`registro_log`.`id_registro` = id_registro
    ORDER BY 
		`registro_log`.`id` DESC;
    
    RETURN registro_data;
END$$
DELIMITER ;
