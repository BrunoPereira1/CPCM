DROP TRIGGER IF EXISTS trg_agenda_au;
DROP TRIGGER IF EXISTS trg_agenda_ai;

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER trg_agenda_au AFTER UPDATE ON agenda 
FOR EACH ROW BEGIN
    IF (new.status <> old.status) THEN
		CALL sp_agendalog(new.id, CONCAT('Status modificado para ', new.status));
    END IF; 
END$$
DELIMITER ;
agenda_log
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER trg_agenda_ai AFTER INSERT ON agenda 
FOR EACH ROW BEGIN
    IF (new.status = 'ABERTO') THEN
		CALL sp_agendalog(new.id, CONCAT('Registro agendado para ', DATE_FORMAT(new.datahora, '%d/%m/%Y %T')));
    END IF;            
END$$
DELIMITER ;

