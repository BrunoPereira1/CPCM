import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContex from "../store/Context";
import apiUsuario from "../../services/ApiUsuario";

function initialState() {
  return { email: "", senha: "" };
}

const Login = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken, setFuncao, setId } = useContext(StoreContex);

  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });

    setError(null);
  }

  function validarEmail() {
    if (values.email.length === 0) {
      document.getElementById("errEmail").innerHTML = "Campo Vazio!";
      return 0;
    } else if (
      values.email.indexOf("@") !== -1 &&
      (values.email.indexOf(".com") !== -1 ||
        values.email.indexOf(".com.br") !== -1)
    ) {
      document.getElementById("errEmail").innerHTML = "";
      return 1;
    } else {
      document.getElementById("errEmail").innerHTML = "Insira um Email Válido!";
      return 0;
    }
  }

  function validarSenha() {
    if (values.senha.length === 0) {
      document.getElementById("errSenha").innerHTML = "Campo Vazio!";

      return 0;
    } else if (values.senha.length <= 4) {
      document.getElementById("errSenha").innerHTML =
        "Sua senha deve conter 5 caracteres";
      return 0;
    } else {
      document.getElementById("errSenha").innerHTML = "";
      return 1;
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    const val = validarEmail() + validarSenha();
    if (val === 2) {
      try {
        const result = await apiUsuario.post("/Auth", {
          login: values.email,
          senha: values.senha
        });
        if (result.status === 200) {
          setToken(result.data.token);
          setFuncao(result.data.function);
          setId(result.data.identity);
          if (result.data.function === "1") {
            return history.push("/Dash");
          }
          return history.push("/SchedulesOpen");
        } else {
          console.log("HTTP!=200");
          document.getElementById("msg_erro").innerHTML = "Usuário ou senha inválidos!";
        }
        console.log(result.data);
        setValues(initialState());
      } catch (error) {
        setError(error);
        return null;
      }
    }
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <h1>Login</h1>
        </div>
        <span id="msg_erro" style={{ marginLeft: 100, color: "red" }} >{error ? "E-mail ou Senha Inválidos!" : null}</span>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">CPCM - Câmara Privada de Conciliação e Mediação</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={onChange}
                  value={values.email}
                  onBlur={validarEmail}
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
              <div className="input-group mb-3">
                <input
                  type="Password"
                  name="senha"
                  className="form-control"
                  placeholder="Senha"
                  onChange={onChange}
                  value={values.senha}
                  onBlur={validarSenha}
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
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
                id="errSenha"
                className="Erros"
              ></span>
              <div className="row">
                {/* /.col */}
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ marginLeft: 222 }}
                  >
                    Entrar
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            {/* /.social-auth-links */}
            {/*
            <p className="mb-1">
              <Link to="/ForgotPassword">Esqueci minha senha!</Link>
            </p>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
