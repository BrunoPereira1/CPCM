import React, { useState } from "react";
import { Link } from "react-router-dom";

function initialState() {
  return { email: "" };
}

const ForgotPassaword = () => {
  const [value, setValue] = useState(initialState);

  function onChange(event) {
    const { value, name } = event.target;

    setValue({
      ...value,
      [name]: value,
    });
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href=" ">Esqueci minha senha!</a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              Você esqueceu sua senha? Aqui você pode facilmente recupera-lá!
            </p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={onChange}
                  value={value.email}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Reenvie minha senha!
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <p className="mt-3 mb-1">
              <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassaword;
