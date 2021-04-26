/*
SELECT * FROM registro;
SELECT * FROM registro_log;
SELECT * FROM agenda;
SELECT * FROM agenda_log;
SELECT * FROM vw_registro;
SELECT * FROM usuario;
SELECT * FROM funcao;
*/
SELECT * FROM registro;
SELECT * FROM vw_registro;




/*

#CALL sp_usuario('email@globo.com.br', '123456', @auth);

{
  "Id": 1,
  "Tipo": "MEDIAÇÃO",
  "Assunto": "Teste",
  "Mensagem": "Teste",
  "Nome": "JOÃO DA SILVA",
  "Fone": "81.99973-7645",
  "Email": "joao.ferreira.santos@gmail.com",
  "Registrado_em": "2020-12-01 12:01:14",
  "Usuario": 3,
  "Uu_Id": "70e4bbda-3ac4-11eb-94ba-fc4596f4554a"
}


SELECT status AS 'Field', count(status) AS 'Count' FROM vw_registro  GROUP BY 1 ORDER BY status ASC
SELECT tipo AS 'Field', count(tipo) AS 'Count' FROM vw_registro GROUP BY 1 ORDER BY tipo ASC

*/

