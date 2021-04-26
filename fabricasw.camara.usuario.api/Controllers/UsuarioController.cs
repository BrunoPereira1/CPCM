using Microsoft.AspNetCore.Mvc;
using System;

namespace fabricasw.camara.usuario.api
{
    /// <summary>
    /// Controlador da API de Usuários do Sistema
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        /// <summary>
        /// Camada de Serviços de Usuário
        /// </summary>
        private readonly UsuarioService _service;

        /// <summary>
        /// Construtor padrão para iniciar a API
        /// </summary>
        /// <param name="service">Camada de Serviços de Usuário</param>        
        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        /// <summary>
        /// Insere um novo usuário do sistema
        /// </summary>
        /// <param name="obj">Modelo de Usuário da câmara</param>
        /// <returns>Insere um novo usuário do sistema</returns>        
        [HttpPost("Insert")]
        public IActionResult Insert([FromBody]ObjetoVM obj)
        {            
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                
                var result = _service.Insert(obj);

                if (result == null)
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao inserir: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Autentica um usuário da câmara e retorna os dados do cadastro
        /// </summary>
        /// <param name="obj">Modelo de Usuário da câmara</param>
        /// <returns>Autentica um usuário da câmara e retorna os dados do cadastro</returns>
        [HttpPost("Auth")]
        public IActionResult Auth([FromBody]LoginVM obj)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = _service.Auth(obj);

                if (result == null)
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao autenticar: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Lista todos os usuáios do sistema
        /// </summary>
        /// <returns>Retorna todos os usuários do sistema</returns>       
        [HttpGet("List")]
        public IActionResult List()
        {
            try
            {
                var result = _service.List();

                if (result == null)
                    return NotFound("Usuarios não encontrados");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao listar: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Exibe um usuário do sistema através do id
        /// </summary>
        /// <returns>Retorna um usuários da câmara</returns>
        [HttpGet("id/{id}")]
        public  IActionResult Find(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Id está inválido");

                var result = _service.Find(id);

                if (result == null)
                    return NotFound("Id não encontrado");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao localizar: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Atualiza um usuários da câmara já existente
        /// </summary>
        /// <param name="obj">Modelo de Registro de serviço</param>
        /// <returns>Atualiza um registro de serviço e retorna ele atualizado</returns>
        [HttpPut("Update")]
        public IActionResult Update([FromBody]ObjetoVM obj)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = _service.Update(obj);

                if (result == null)
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao atualizar: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Atualiza o status de um usuário da câmara já existente
        /// </summary>
        /// <param name="id">Id do Usuário do Sistema</param>
        /// <param name="status">Código de status do Usuário da câmara</param>
        /// <returns>Atualiza o status de um usuário do sistema</returns>
        [HttpPost("id/{id}/status/{status}")]
        public IActionResult Status(int id, string status)
        {
            try
            {
                if (id <= 0) 
                    return BadRequest("Id está inválido");

                if (string.IsNullOrEmpty(status))
                    return BadRequest("Código de status está inválido");

                var result = _service.Status(id, status);

                if (result == null)
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao atualizar status: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Reiniciar a senha de um usuário da câmara já existente
        /// </summary>
        /// <param name="id">Id do Usuário do Sistema</param>
        /// <returns>Reinicia a senha de um usuário do sistema</returns>
        [HttpPost("id/{id}")]
        public IActionResult Reset(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Id está inválido");                

                var result = _service.Reset(id);

                if (result == null)
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao resetar senha: " + ex.Message }
                });
            }
        }


    }
}