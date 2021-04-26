import React, { useState, useRef } from "react";
import apiUsuario from "../../../services/ApiUsuario";
import InputMask from "react-input-mask";
import { useHistory } from "react-router-dom";

function initialState() {
  return { nome: "", fone: "", email: "", login: "", id_funcao: "" };
}

function NewUser() {
  const [newUsers, setNewUsers] = useState(initialState);
  let btnRef = useRef();

  const history = useHistory();

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "InsertUser.js";
    script.async = true;

    document.body.appendChild(script);
  }

  function onChange(event) {
    const { value, name } = event.target;

    setNewUsers({
      ...newUsers,
      [name]: value,
    });
  }

  async function onSubmit() {
    const val =
      validarFuncao() +
      validarNome() +
      validarTelefone() +
      validarLogin() +
      validarEmail();
    console.log(val);
    if (val === 5) {
      if (btnRef.current) {
        btnRef.current.setAttribute("disabled", "disabled");
        try {
          const result = await apiUsuario.post("/Insert", {
            nome: newUsers.nome,
            fone: newUsers.fone.replace(/\D/g, ""),
            email: newUsers.email,
            login: newUsers.login,
            senha: "123456",
            id_funcao: newUsers.id_funcao,
          });
          if (result.status === 200) {
            loadToastr("Success");
            setTimeout(() => {
              return history.push("/UsersManager");
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          loadToastr("Fail");
        }
      }
    }
  }

  function validarNome() {
    if (newUsers.nome.length !== 0) {
      document.getElementById("errNome").innerHTML = "";
      return 1;
    } else {
      document.getElementById("errNome").innerHTML = "Campo Vazio!";
      return 0;
    }
  }

  function validarTelefone() {
    if (newUsers.fone.replace(/\D/g, "").length !== 0) {
      if (
        newUsers.fone.replace(/\D/g, "").length === 11 ||
        newUsers.fone.replace(/\D/g, "").length === 10
      ) {
        document.getElementById("errFone").innerHTML = "";
        return 1;
      } else {
        document.getElementById("errFone").innerHTML =
          "Insira um Telefone Válido!";
        return 0;
      }
    } else {
      document.getElementById("errFone").innerHTML = "Campo Vazio!";
      return 0;
    }
  }

  function validarEmail() {
    if (newUsers.email.length === 0) {
      document.getElementById("errEmail").innerHTML = "Campo Vazio!";
      return 0;
    } else if (
      newUsers.email.indexOf("@") !== -1 &&
      (newUsers.email.indexOf(".com") !== -1 ||
        newUsers.email.indexOf(".com.br") !== -1)
    ) {
      document.getElementById("errEmail").innerHTML = "";
      return 1;
    } else {
      document.getElementById("errEmail").innerHTML = "Insira um Email Válido!";
      return 0;
    }
  }

  function validarLogin() {
    if (newUsers.login.length !== 0) {
      document.getElementById("errLogin").innerHTML = "";
      return 1;
    } else {
      document.getElementById("errLogin").innerHTML = "Campo Vazio!";
      return 0;
    }
  }

  function validarFuncao() {
    if (newUsers.id_funcao.length !== 0) {
      document.getElementById("errFuncao").innerHTML = "";
      return 1;
    } else {
      document.getElementById("errFuncao").innerHTML = "Campo Vazio!";
      return 0;
    }
  }

  function onClickCancel() {
    return window.history.back();
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Cadastrar</h1>
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
          <div style={{ width: "200%" }} className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-navy">
                  <div className="card-header">
                    <h3 className="card-title">Formulário</h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="inputName">Nome</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputName"
                          name="nome"
                          className="form-control"
                          onChange={onChange}
                          onBlur={validarNome}
                          placeholder="Insira o Nome do Funcionário"
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
                          paddingTop: 2,
                        }}
                        id="errNome"
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
                          paddingTop: 2,
                        }}
                        id="errFone"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Email</label>
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
                          paddingTop: 2,
                        }}
                        id="errEmail"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Usuário</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputName"
                          name="login"
                          className="form-control"
                          onChange={onChange}
                          onBlur={validarLogin}
                          placeholder="Insira o nome para o Usuário"
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-user" />
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 2,
                        }}
                        id="errLogin"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Função</label>
                      <select
                        className="form-control custom-select"
                        name="id_funcao"
                        defaultValue="0"
                        onChange={onChange}
                        onBlur={validarFuncao}
                      >
                        <option value="0" hidden disabled>
                          Selecione a função
                        </option>
                        <option value="1">Coordenador</option>
                        <option value="2">Mediador</option>
                        <option value="3">Advogado</option>
                        <option value="4">Secretário</option>
                      </select>
                      <span
                        style={{
                          fontSize: 12,
                          color: "red",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          paddingTop: 2,
                        }}
                        id="errFuncao"
                        className="Erros"
                      ></span>
                    </div>
                    <div style = {{marginTop: 20}} className="float-right">
                    <button
                      style={{ marginRight: 10 }}
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => onClickCancel()}
                    >
                      Cancelar
                    </button>
                    <button
                      style={{width: 85 }}
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
}

export default NewUser;
