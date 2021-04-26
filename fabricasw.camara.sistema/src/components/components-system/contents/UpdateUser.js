import React, { useState, useEffect, useRef } from "react";
import apiUsuario from "../../../services/ApiUsuario";
import StringMask from "string-mask";
import InputMask from "react-input-mask";
import { useHistory } from "react-router-dom";

function UserUpdate(props) {

  const history = useHistory();

  const [newValues, setNewValues] = useState([]);
  let btnRef = useRef();

  useEffect(() => {
    const fetchSchedules = async () => {
      const result = await apiUsuario.get("/id/" + props.idUser);

      setNewValues(result.data);
    };

    fetchSchedules();
  }, [props.idUser]);

  function onChange(event) {
    const { value, name } = event.target;

    setNewValues({
      ...newValues,
      [name]: value,
    });
  }

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "UpdateUser.js";
    script.async = true;

    document.body.appendChild(script);
  }

  async function onSubmit() {
    const val = validarLogin() + validarNome() + validarTelefone() + validarEmail();
    if (val === 4) {
      if (btnRef.current) {
        btnRef.current.setAttribute("disabled", "disabled");
        try {
          const result = await apiUsuario.put("/Update/", {
            id: newValues.id,
            nome: newValues.nome,
            fone: newValues.fone.replace(/\D/g, ""),
            email: newValues.email,
            login: newValues.login,
            senha: newValues.senha,
            ativo: newValues.ativo,
            id_funcao: newValues.id_funcao,
          });
          console.log(result)
          if (result.status === 200) {
            loadToastr("Success");
            setTimeout(() => {
              return history.push("/UsersManager");;
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          loadToastr("Fail");
        }
      }
    }
  }

  function validarLogin() {
    if (newValues.login.length !== 0) {
      document.getElementById("errUpLogin").innerHTML = "";
      return true;
    } else {
      document.getElementById("errUpLogin").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarNome() {
    if (newValues.nome.length !== 0) {
      document.getElementById("errUpNome").innerHTML = "";
      return true;
    } else {
      document.getElementById("errUpNome").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarTelefone() {
    if (newValues.fone.replace(/\D/g, "").length !== 0) {
      if (
        newValues.fone.replace(/\D/g, "").length === 11 ||
        newValues.fone.replace(/\D/g, "").length === 10
      ) {
        document.getElementById("errUpFone").innerHTML = "";
        return true;
      } else {
        document.getElementById("errUpFone").innerHTML =
          "Insira um Telefone Válido!";
        return false;
      }
    } else {
      document.getElementById("errUpFone").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarEmail() {
    if (newValues.email.length === 0) {
      document.getElementById("errUpEmail").innerHTML = "Campo Vazio!";
      return false;
    } else if (
      newValues.email.indexOf("@") !== -1 &&
      (newValues.email.indexOf(".com") !== -1 ||
        newValues.email.indexOf(".com.br") !== -1)
    ) {
      document.getElementById("errUpEmail").innerHTML = "";
      return true;
    } else {
      document.getElementById("errUpEmail").innerHTML =
        "Insira um Email Válido!";
      return false;
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
                <h1>Editar Funcionário</h1>
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
                      <label htmlFor="inputName">Usuário</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputName"
                          name="login"
                          className="form-control"
                          defaultValue={newValues.login}
                          onChange={onChange}
                          onBlur={validarLogin}
                          placeholder="Insira o Usuário"
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-id-badge" />
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
                        id="errUpLogin"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Nome</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputName"
                          name="nome"
                          className="form-control"
                          defaultValue={newValues.nome}
                          onChange={onChange}
                          onBlur={validarNome}
                          placeholder="Insira o Nome"
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
                        id="errUpNome"
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
                          defaultValue={new StringMask("(99)99999-9999").apply(
                            newValues.fone
                          )}
                          value={newValues.fone}
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
                        id="errUpFone"
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
                          defaultValue={newValues.email}
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
                        id="errUpEmail"
                        className="Erros"
                      ></span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputName">Função</label>
                      <select
                        className="form-control custom-select"
                        name="id_funcao"
                        onChange={onChange}
                        value={newValues.id_funcao}
                      >
                        <option value="1">Coordenador</option>
                        <option value="2">Mediador</option>
                        <option value="3">Advogado</option>
                        <option value="4">Secretário</option>
                      </select>
                    </div>
                    <div style = {{marginTop: 20}} className="float-right">
                      <button
                        style={{  marginRight: 10 }}
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => onClickCancel()}
                      >
                        Cancelar
                      </button>
                      <button
                        style={{width: 85}}
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

export default UserUpdate;