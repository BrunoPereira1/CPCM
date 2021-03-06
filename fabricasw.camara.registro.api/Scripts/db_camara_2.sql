DROP TRIGGER IF EXISTS trg_registro_au;
DROP TRIGGER IF EXISTS trg_registro_ai;

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER trg_registro_au AFTER UPDATE ON registro 
FOR EACH ROW BEGIN        
	UPDATE
		agenda
	SET
		agenda.id_registro  = new.id
	WHERE
		agenda.id_registro is null AND
        new.id OR agenda.uu_id = new.uu_id;        
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER trg_registro_ai AFTER INSERT ON registro 
FOR EACH ROW BEGIN   
    UPDATE
		agenda
	SET
		agenda.id_registro  = new.id
	WHERE
		agenda.id_registro is null AND
        agenda.uu_id = new.uu_id;  	
END$$
DELIMITER ;

