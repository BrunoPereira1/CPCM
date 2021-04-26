DROP VIEW IF EXISTS vw_usuario;

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `vw_usuario` AS
    SELECT 
        `usuario`.`id` AS `id`,
        `usuario`.`nome` AS `nome`,
        `usuario`.`fone` AS `fone`,
        `usuario`.`email` AS `email`,
        `usuario`.`login` AS `login`,
        `usuario`.`senha` AS `senha`,
        `usuario`.`ativo` AS `ativo`,
        `usuario`.`id_funcao` AS `id_funcao`,
        `funcao`.`funcao` AS `funcao`
    FROM
        (`usuario`
        JOIN `funcao` ON ((`usuario`.`id_funcao` = `funcao`.`id`)))
    ORDER BY `usuario`.`nome` ASC;