DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_validarsuario`(id_usuario INT) RETURNS varchar(150) CHARSET utf8 COLLATE utf8_bin
    DETERMINISTIC
BEGIN	 	
    DECLARE id INT DEFAULT 0;
    SET id_usuario = COALESCE(id_usuario, 0);
    IF (id_usuario <= 0) THEN
      SELECT 
		  `usuario`.`id`
      INTO
		  id
      FROM 
		  `usuario` 
      WHERE 
		  `usuario`.`ativo` = 'S'
	  ORDER BY 
          `usuario`.`id`
	  ASC
	  LIMIT 1;
  ELSE
      SELECT 
		  `usuario`.`id`
      INTO
		  id
      FROM 
		  `usuario` 
      WHERE 
		  `usuario`.`id` = id_usuario AND
          `usuario`.`ativo` = 'S';
  END IF;
  RETURN id;
END$$
DELIMITER ;
