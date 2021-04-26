DROP FUNCTION IF EXISTS `fn_agendalog_data`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_agendalog_data`(id_agenda INT) RETURNS datetime
    DETERMINISTIC
BEGIN	
	DECLARE agenda_data datetime DEFAULT CURRENT_TIMESTAMP(); 
    SELECT 
		MAX(`agenda_log`.`datahora`) 
    INTO
		agenda_data
    FROM 
		`agenda_log` 
    WHERE 
		`agenda_log`.`id_agenda` = id_agenda
    ORDER BY 
		`agenda_log`.`id` DESC;
    
    RETURN agenda_data;
END$$
DELIMITER ;
