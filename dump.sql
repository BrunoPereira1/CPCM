-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: localhost    Database: db_camara
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `agenda` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_registro` int(10) unsigned DEFAULT NULL,
  `status` enum('ABERTO','VERIFICADO','REALIZADO','PROCESSADO','ENCERRADO','CANCELADO') COLLATE utf8_bin NOT NULL,
  `datahora` datetime DEFAULT NULL,
  `observacao` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `id_usuario` int(10) unsigned DEFAULT NULL,
  `uu_id` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_registro_1` (`id_registro`),
  KEY `fk_registro_2` (`id_usuario`),
  CONSTRAINT `fk_registro_1` FOREIGN KEY (`id_registro`) REFERENCES `registro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_registro_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_agenda_ai` AFTER INSERT ON `agenda` FOR EACH ROW BEGIN
    IF (new.status = 'ABERTO') THEN
		CALL sp_agendalog(new.id, CONCAT('Registro agendado para ', DATE_FORMAT(new.datahora, '%d/%m/%Y %T')));
    END IF;            
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_agenda_au` AFTER UPDATE ON `agenda` FOR EACH ROW BEGIN
    IF (new.status <> old.status) THEN
		CALL sp_agendalog(new.id, CONCAT('Status modificado para ', new.status));
    END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `agenda_log`
--

DROP TABLE IF EXISTS `agenda_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `agenda_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_agenda` int(10) unsigned DEFAULT NULL,
  `datahora` datetime DEFAULT CURRENT_TIMESTAMP,
  `ocorrencia` text COLLATE utf8_bin,
  PRIMARY KEY (`id`),
  KEY `fk_agenda_log` (`id_agenda`),
  CONSTRAINT `fk_agenda_log` FOREIGN KEY (`id_agenda`) REFERENCES `agenda` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `funcao`
--

DROP TABLE IF EXISTS `funcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `funcao` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `funcao` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `registro` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo` enum('MEDIAÇÃO','ORIENTAÇÃO') COLLATE utf8_bin NOT NULL,
  `assunto` varchar(500) COLLATE utf8_bin NOT NULL,
  `mensagem` varchar(1000) COLLATE utf8_bin NOT NULL,
  `nome` varchar(500) COLLATE utf8_bin NOT NULL,
  `fone` varchar(15) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `registrado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  `uu_id` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_registro_ai` AFTER INSERT ON `registro` FOR EACH ROW BEGIN   
    UPDATE
		agenda
	SET
		agenda.id_registro  = new.id
	WHERE
		agenda.id_registro is null AND
        agenda.uu_id = new.uu_id;  	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_registro_au` AFTER UPDATE ON `registro` FOR EACH ROW BEGIN        
	UPDATE
		agenda
	SET
		agenda.id_registro  = new.id
	WHERE
		agenda.id_registro is null AND
        new.id OR agenda.uu_id = new.uu_id;        
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `registro_log`
--

DROP TABLE IF EXISTS `registro_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `registro_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_registro` int(10) unsigned DEFAULT NULL,
  `id_usuario` int(10) unsigned DEFAULT NULL,
  `datahora` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_registro_log_1` (`id_registro`),
  KEY `fk_registro_log_2` (`id_usuario`),
  CONSTRAINT `fk_registro_log_1` FOREIGN KEY (`id_registro`) REFERENCES `registro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_registro_log_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(5000) COLLATE utf8_bin DEFAULT NULL,
  `fone` varchar(15) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `login` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `senha` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `ativo` enum('S','N') COLLATE utf8_bin DEFAULT 'S',
  `id_funcao` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuario` (`login`),
  KEY `fk_funcao` (`id_funcao`),
  CONSTRAINT `fk_funcao` FOREIGN KEY (`id_funcao`) REFERENCES `funcao` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `vw_registro`
--

DROP TABLE IF EXISTS `vw_registro`;
/*!50001 DROP VIEW IF EXISTS `vw_registro`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vw_registro` AS SELECT 
 1 AS `id`,
 1 AS `tipo`,
 1 AS `assunto`,
 1 AS `mensagem`,
 1 AS `nome`,
 1 AS `fone`,
 1 AS `email`,
 1 AS `registrado_em`,
 1 AS `status`,
 1 AS `agenda_em`,
 1 AS `atualizado_em`,
 1 AS `modificado_em`,
 1 AS `observacao`,
 1 AS `uu_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_usuario`
--

DROP TABLE IF EXISTS `vw_usuario`;
/*!50001 DROP VIEW IF EXISTS `vw_usuario`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vw_usuario` AS SELECT 
 1 AS `id`,
 1 AS `nome`,
 1 AS `fone`,
 1 AS `email`,
 1 AS `login`,
 1 AS `senha`,
 1 AS `ativo`,
 1 AS `id_funcao`,
 1 AS `funcao`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'db_camara'
--

--
-- Dumping routines for database 'db_camara'
--
/*!50003 DROP FUNCTION IF EXISTS `fn_agendalog_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_registrolog_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_validarsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_agendalog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agendalog`(    
  IN id_agenda INT,
  IN ocorrencia TEXT)
BEGIN
	INSERT INTO 
		agenda_log (`id_agenda`, `ocorrencia`) 
	VALUES 
		(id_agenda, ocorrencia); 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_registro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_registro`
--

/*!50001 DROP VIEW IF EXISTS `vw_registro`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_registro` AS select `registro`.`id` AS `id`,`registro`.`tipo` AS `tipo`,`registro`.`assunto` AS `assunto`,`registro`.`mensagem` AS `mensagem`,`registro`.`nome` AS `nome`,`registro`.`fone` AS `fone`,`registro`.`email` AS `email`,`registro`.`registrado_em` AS `registrado_em`,`agenda`.`status` AS `status`,`agenda`.`datahora` AS `agenda_em`,(select `FN_AGENDALOG_DATA`(`agenda`.`id`)) AS `atualizado_em`,(select `FN_REGISTROLOG_DATA`(`registro`.`id`)) AS `modificado_em`,`agenda`.`observacao` AS `observacao`,`registro`.`uu_id` AS `uu_id` from (`registro` join `agenda` on(((`registro`.`id` = `agenda`.`id_registro`) and (`registro`.`uu_id` = `agenda`.`uu_id`)))) order by (select `FN_AGENDALOG_DATA`(`agenda`.`id`)) desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_usuario`
--

/*!50001 DROP VIEW IF EXISTS `vw_usuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_usuario` AS select `usuario`.`id` AS `id`,`usuario`.`nome` AS `nome`,`usuario`.`fone` AS `fone`,`usuario`.`email` AS `email`,`usuario`.`login` AS `login`,`usuario`.`senha` AS `senha`,`usuario`.`ativo` AS `ativo`,`usuario`.`id_funcao` AS `id_funcao`,`funcao`.`funcao` AS `funcao` from (`usuario` join `funcao` on((`usuario`.`id_funcao` = `funcao`.`id`))) order by `usuario`.`nome` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-13 18:38:28
