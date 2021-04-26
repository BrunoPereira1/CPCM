using Microsoft.AspNetCore.Mvc;
using System;

namespace fabricasw.camara.registro.api
{
    /// <summary>
    /// Controlador da API de Registros de Serviços
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        /// <summary>
        /// Camada de Serviços de Registro
        /// </summary>
        private readonly RegistroService _service;

        /// <summary>
        /// Construtor padrão para iniciar a API
        /// </summary>
        /// <param name="service">Camada de Serviços de Registro</param>        
        public RegistroController(RegistroService service)
        {
            _service = service;
        }

        /// <summary>
        /// Insere um novo registro de serviço
        /// </summary>
        /// <param name="obj">Modelo de Registro de serviço</param>
        /// <returns>Insere um novo registro de serviço</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="400">NoContent</response>
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
        /// Insere um novo registro de serviço e retorna a sequência do protocolo
        /// </summary>
        /// <param name="obj">Modelo de Registro de serviço</param>
        /// <returns>Insere um novo registro de serviço e retorna a sequência do protocolo</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="400">NoContent</response>
        [HttpPost("Post")]
        public IActionResult Post([FromBody]ObjetoVM obj)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = _service.Post(obj);

                if (result == null)
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao postar: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Lista todos os registros de serviços
        /// </summary>
        /// <returns>Retorna todos os registros de serviços</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="404">NotFound</response>
        [HttpGet("List")]
        public IActionResult List()
        {
            try
            {
                var result = _service.List();

                if (result == null)
                    return NotFound("Registros não encontrados");

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
        /// Exibe um registro de serviço através do id
        /// </summary>
        /// <returns>Retorna um registro de serviço</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="404">NotFound</response>
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
        /// Atualiza um registro de serviço já existente
        /// </summary>
        /// <param name="obj">Modelo de Registro de serviço</param>
        /// <returns>Atualiza um registro de serviço e retorna ele atualizado</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="400">NoContent</response>
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
        /// Exibe um registro de serviço através do protocolo
        /// </summary>
        /// <returns>Retorna um registro de serviço</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="404">NotFound</response>
        [HttpGet("uuid/{uuId}")]
        public IActionResult Search(string uuId)
        {
            try
            {
                if ((uuId == null) || (uuId == string.Empty))
                    return BadRequest("Dados do protocolo estão inválidos");

                var result = _service.Search(uuId);

                if (result == null)
                    return NotFound("Protocolo não encontrado");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao pesquisar: " + ex.Message }
                });
            }
        }

        /// <summary>
        /// Atualiza o status de um registro de serviço já existente
        /// </summary>
        /// <param name="id">Id do Registro de Serviço</param>
        /// <param name="code">Código de status do Registro de Serviço</param>
        /// <returns>Atualiza o status de um registro de serviço</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="400">NoContent</response>
        [HttpPost("id/{id}/status/{code}")]
        public IActionResult Status(int id, int code)
        {
            try
            {
                if (id <= 0) 
                    return BadRequest("Id está inválido");

                if ((code <= 0) || (code > 6))
                    return BadRequest("Código de status está inválido");

                var result = _service.Status(id, code);

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
        /// Lista todos os registros de serviços
        /// </summary>
        /// <returns>Retorna todos os registros de serviços</returns>
        ///// <response code="200">OK</response>
        ///// <response code="204">BadRequest</response>
        ///// <response code="400">NotFound</response>
        [HttpGet("Dashboard")]
        public IActionResult Dash()
        {
            try
            {
                var result = _service.Dash();

                if (result == null)
                    return NoContent();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    errors = new string[] { "Falha ao carregar dashboard: " + ex.Message }
                });
            }
        }

    }
}