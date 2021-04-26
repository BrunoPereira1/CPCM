DROP PROCEDURE IF EXISTS `sp_usuario`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario`(  
  IN login VARCHAR(2000),
  IN senha VARCHAR(100),
  OUT auth INT)
BEGIN
	DECLARE user_row INT DEFAULT 0; 
    SELECT 
		`usuario`.`id`
    INTO
		user_row
    FROM 
		`usuario` 
    WHERE 
		`usuario`.`email` = login AND /*Review in near future!*/
		`usuario`.`senha` = senha AND
		`usuario`.`ativo` = 'S';

  IF (user_row > 0) THEN
    SET auth = user_row;
  ELSE
	SET auth = 0;
  END IF;

  SELECT auth;
END$$
DELIMITER ;
