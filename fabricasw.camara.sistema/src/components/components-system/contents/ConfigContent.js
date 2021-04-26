import React, { useState, useEffect, useContext } from "react";
import apiUsuario from "../../../services/ApiUsuario";
import StoreContex from "../../store/Context";
import ModalUpdatePassword from "../modal/ModalUpdatePassword";
import { CustomDialog } from "react-st-modal";
//import moment from "moment";
import StringMask from "string-mask";

const ConfigContent = (props) => {
  const [user, setUser] = useState([]);
  const { id } = useContext(StoreContex);

  useEffect(() => {
    const fetchSchedules = async () => {
      const result = await apiUsuario.get("/id/" + id);

      setUser(result.data);
    };

    fetchSchedules();
  }, [id]);

  async function onClickUpdate(key) {
    const result = await CustomDialog(
        <ModalUpdatePassword idUser = {user.id}/>, {
      title: "Trocar Senha",
      showCloseIcon: true,
    });
    if (result) {
      return window.location.reload();
    }
  }

  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Configurações do Funcionário</h1>
              </div>
              {/* <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">
                    Detalhes do Funcionário
                  </li>
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
                    <h3 className="card-title">Informações</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-12">
                        <div className="info-box">
                          <div className="info-box-content">
                            <span className="info-box-text text-center text-bold">
                              Função
                            </span>
                            <span
                              style={{ color: "#4F4F4F" }}
                              className="info-box-number text-center text-primary mb-0"
                            >
                              {user.funcao}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Login</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {user.login}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Nome Completo</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {user.nome}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>E-mail:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {user.email}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Telefone:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {new StringMask("(99)99999-9999").apply(user.fone)}
                      </label>
                    </div>
                    <div style = {{marginTop: 20}} className="float-right">
                      <button
                        style={{ marginRight: 10 }}
                        id="editar"
                        className="btn btn-outline-primary"
                        onClick={async () => onClickUpdate(user.id)}
                      >
                        Trocar Senha
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

export default ConfigContent;
