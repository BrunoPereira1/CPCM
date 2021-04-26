import React, { useEffect, useState } from "react";
import apiUsuario from "../../../services/ApiUsuario";
import ModalStatusUser from "../modal/ModalStatusUser";
import ModalResetPassword from "../modal/ModalResetPassword";
import { useHistory } from "react-router-dom";
import { CustomDialog } from "react-st-modal";
import StringMask from "string-mask";

const ManagerUsers = (props) => {
  const [user, setUser] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await apiUsuario.get("/List");
      setUser(result.data);
    };
    fetchUsers();
  }, []);

  function onClickUpdate(key) {
    return history.push({
      pathname: "/UserUpdate",
      state: {
        idUser: key
      }
    });
  }

  function onClicknovoFuncionario() {
    return history.push("/UserNew");
  }

  async function onClickReset(key, key2) {
    const result = await CustomDialog(
      <ModalResetPassword idUser={key} user={key2} />,
      {
        title: " Resetar Senha",
        showCloseIcon: true,
      }
    );
    if (result) {
      return window.location.reload();
    }
  }

  async function onClickTradeStatus(key, key2, key3) {
    const result = await CustomDialog(<ModalStatusUser idUser={key} user={key2} statusUser={key3} />, {
      title: "Alterar Status",
      showCloseIcon: true,
    });
    if (result) {
      return window.location.reload();
    }
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Funcionários</h1>
              </div>
              {/* <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">Funcionários</li>
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
                    <h3 className="card-title">Lista</h3>
                    <div className="card-tools">
                      <button
                        className="btn btn-tool "
                        style={{
                          color: "white",
                        }}
                        title="Adicionar"
                        onClick={() => onClicknovoFuncionario()}
                      >
                        <i className="fas fa-plus-circle" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Usuário</th>
                          <th>Nome</th>
                          <th>Telefone</th>
                          <th>Email</th>
                          <th>Função</th>
                          <th>Status</th>
                          <th style={{ width: 150 }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.map((user) => {
                          return (
                            <tr key={user.id}>
                              <td>{user.login}</td>
                              <td>{user.nome}</td>
                              <td>
                                {new StringMask("(99) 99999-9999").apply(
                                  user.fone
                                )}
                              </td>
                              <td>{user.email}</td>
                              <td>{user.funcao}</td>
                              <td
                                style={{ fontWeight: "bold" }}
                                className={
                                  user.ativo === "S"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {user.ativo === "S" ? "ATIVO" : "INATIVO"}
                              </td>
                              <td className="text-center py-0 align-middle">
                                <div className="btn-group btn-group-sm">
                                  <button
                                    style={{ width: 30, marginRight: 5, color: "#FFFAFA" }}
                                    className={"btn btn-primary "}
                                    title="Atualizar"
                                    onClick={() => onClickUpdate(user.id)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    style={{ width: 30, marginRight: 5, color: "#FFFAFA" }}
                                    className={"btn btn-secondary"}
                                    title="Atualizar Status"
                                    onClick={async () =>
                                      onClickTradeStatus(user.id, user.nome, user.ativo)
                                    }
                                  >
                                    <i className="fas fa-sync-alt"></i>
                                  </button>
                                  <button
                                    style={{ width: 30, color: "#FFFAFA" }}
                                    className={"btn btn-danger"}
                                    title="Reset Senha"
                                    onClick={async () =>
                                      onClickReset(user.id, user.nome)
                                    }
                                  >
                                    <i className="fas fa-key"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* /.card-body */}
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

export default ManagerUsers;
