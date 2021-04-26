DROP VIEW IF EXISTS vw_registro;

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `vw_registro` AS
    SELECT 
        `registro`.`id` AS `id`,
        `registro`.`tipo` AS `tipo`,
        `registro`.`assunto` AS `assunto`,
        `registro`.`mensagem` AS `mensagem`,
        `registro`.`nome` AS `nome`,
        `registro`.`fone` AS `fone`,
        `registro`.`email` AS `email`,
        `registro`.`registrado_em` AS `registrado_em`,
        `agenda`.`status` AS `status`,
        `agenda`.`datahora` AS `agenda_em`,
        (SELECT FN_AGENDALOG_DATA(`agenda`.`id`)) AS `atualizado_em`,
        (SELECT FN_REGISTROLOG_DATA(`registro`.`id`)) AS `modificado_em`,
        `agenda`.`observacao` AS `observacao`,
        `registro`.`uu_id` AS `uu_id`
    FROM
        (`registro`
        JOIN `agenda` ON (((`registro`.`id` = `agenda`.`id_registro`)
            AND (`registro`.`uu_id` = `agenda`.`uu_id`))))
    ORDER BY (SELECT FN_AGENDALOG_DATA(`agenda`.`id`)) DESC;