import React, { useState, useRef, useContext } from "react";
import apiRegistro from "../../../services/ApiRegistro";
import InputMask from "react-input-mask";
import StoreContext from "../../store/Context";
import { useHistory } from "react-router-dom";

function initialState() {
  return {
    tipo: "",
    assunto: "",
    mensagem: "",
    nome: "",
    fone: "",
    email: "",
  };
}

const NewSchedules = () => {
  const [newSchedules, setNewSchedules] = useState(initialState);
  const {id} = useContext(StoreContext);
  let btnRef = useRef();

  const history = useHistory();

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "InsertSchedule.js";
    script.async = true;

    document.body.appendChild(script);
  }

  function onChange(event) {
    const { value, name } = event.target;

    setNewSchedules({
      ...newSchedules,
      [name]: value,
    });
    console.log(newSchedules);
  }

  async function onSubmit() {
    const val =
      validarAssunto() +
      validarDescricao() +
      validarEmail() +
      validarSolicitante() +
      validarTelefone() +
      validarTipo();
    if (val === 6) {
      if (btnRef.current) {
        btnRef.current.setAttribute("disabled", "disabled");
        try {
          const result = await apiRegistro.post("/Post", {
            tipo: newSchedules.tipo,
            assunto: newSchedules.assunto,
            mensagem: newSchedules.mensagem,
            nome: newSchedules.nome,
            fone: newSchedules.fone.replace(/\D/g, ""),
            email: newSchedules.email,
            usuario: id
          });
          if (result.status === 200) {
            loadToastr("Success");
            setTimeout(() => {
              return history.push("/SchedulesOpen");
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          loadToastr("Fail");
        }
      }
    }
  }

  function validarTipo() {
    if (newSchedules.tipo.length !== 0) {
      document.getElementById("errTipo").innerHTML = "";
      return true;
    } else {
      document.getElementById("errTipo").innerHTML = "Campo não selecionado!";
      return false;
    }
  }

  function validarAssunto() {
    if (newSchedules.assunto.length !== 0) {
      document.getElementById("errAssunto").innerHTML = "";
      return true;
    } else {
      document.getElementById("errAssunto").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarDescricao() {
    if (newSchedules.mensagem.length !== 0) {
      document.getElementById("errDesc").innerHTML = "";
      return true;
    } else {
      document.getElementById("errDesc").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarSolicitante() {
    if (newSchedules.nome.length !== 0) {
      document.getElementById("errNome").innerHTML = "";
      return true;
    } else {
      document.getElementById("errNome").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarEmail() {
    if (newSchedules.email.length === 0) {
      document.getElementById("errEmail").innerHTML = "Campo Vazio!";
      return false;
    } else if (
      newSchedules.email.indexOf("@") !== -1 &&
      (newSchedules.email.indexOf(".com") !== -1 ||
        newSchedules.email.indexOf(".com.br") !== -1)
    ) {
      document.getElementById("errEmail").innerHTML = "";
      return true;
    } else {
      document.getElementById("errEmail").innerHTML = "Insira um Email Válido!";
      return false;
    }
  }

  function validarTelefone() {
    if (newSchedules.fone.replace(/\D/g, "").length !== 0) {
      if (
        newSchedules.fone.replace(/\D/g, "").length === 11 ||
        newSchedules.fone.replace(/\D/g, "").length === 10
      ) {
        document.getElementById("errFone").innerHTML = "";
        return true;
      } else {
        document.getElementById("errFone").innerHTML =
          "Insira um Telefone Válido!";
        return false;
      }
    } else {
      document.getElementById("errFone").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  return (
    <div style={{overflowX:"hidden"}}>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Agendamento</h1>
              </div>
              {/* <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">Novo Agendamento</li>
                </ol>
              </div> */}
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div style={{width: "200%"}} className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-navy">
                  <div className="card-header">
                    <h3 className="card-title">Formulário</h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="inputName">Tipo de Serviço</label>
                      <div className="input-group">
                        <select
                          className="form-control"
                          id="inputName"
                          name="tipo"
                          onChange={onChange}
                          onBlur={validarTipo}
                          defaultValue="0"
                          required
                        >
                          <option value="0" hidden disabled>
                            Selecione o serviço
                          </option>
                          <option>ORIENTAÇÃO</option>
                          <option>MEDIAÇÃO</option>
                        </select>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 7,
                        }}
                        id="errTipo"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Assunto</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputName"
                          name="assunto"
                          className="form-control"
                          onChange={onChange}
                          onBlur={validarAssunto}
                          placeholder="Insira o Assunto aqui"
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-heading" />
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 7,
                        }}
                        id="errAssunto"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Descrição</label>
                      <div className="input-group">
                        <textarea
                          rows = "1"
                          id="inputName"
                          name="mensagem"
                          className="form-control"
                          onChange={onChange}
                          onBlur={validarDescricao}
                          placeholder="Insira a Descrição aqui"
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fa fa-list" />
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 7,
                        }}
                        id="errDesc"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Solicitante</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputName"
                          name="nome"
                          className="form-control"
                          onChange={onChange}
                          onBlur={validarSolicitante}
                          placeholder="Insira o Nome do Solicitante aqui"
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-signature" />
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 7,
                        }}
                        id="errNome"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">E-mail</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputName"
                          name="email"
                          className="form-control"
                          onChange={onChange}
                          onBlur={validarEmail}
                          placeholder="Insira o E-mail aqui"
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-envelope" />
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 7,
                        }}
                        id="errEmail"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Telefone</label>
                      <div className="input-group">
                        <InputMask
                          type="tel"
                          id="inputName"
                          name="fone"
                          className="form-control"
                          onChange={onChange}
                          onBlur={validarTelefone}
                          placeholder="Insira o Telefone"
                          mask="(99) 99999-9999"
                          maskChar=" "
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-phone-square" />
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 7,
                        }}
                        id="errFone"
                        className="Erros"
                      ></span>
                    </div>
                    <div style = {{marginTop: 20}} className="float-right">
                      <button
                        type="button"
                        ref={btnRef}
                        className="btn btn-outline-primary"
                        onClick={onSubmit}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default NewSchedules;
