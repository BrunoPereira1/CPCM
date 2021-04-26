import React, { useState, useEffect, useContext } from "react";
import apiRegistro from "../../../services/ApiRegistro";
import ModalUpdateSchedules from "../modal/ModalUpdateSchedules";
import ModalStatusSchedules from "../modal/ModalStatusSchedules";
import { CustomDialog } from "react-st-modal";
import { useHistory } from "react-router-dom";
import moment from "moment";
import StringMask from "string-mask";
import StoreContex from "../../store/Context";

const DetailsSchedules = (props) => {
  const [schedules, setSchedules] = useState([]);
  const { id } = useContext(StoreContex);
  const history = useHistory();

  useEffect(() => {
    const fetchSchedules = async () => {
      const result = await apiRegistro.get("/id/" + props.idSchedule);

      setSchedules(result.data);
    };

    fetchSchedules();
  }, [props.idSchedule]);

  function statusButton() {
    if (schedules.status === "ENCERRADO" || schedules.status === "CANCELADO") {
      return true;
    } else {
      return false;
    }
  }

  async function onClickUpdate(key) {
    const result = await CustomDialog(
      <ModalUpdateSchedules idSchedule={key} idUser={id} />,
      {
        title: "Editar Agendamentos",
        showCloseIcon: true,
        fullWidth: true,
        maxWidth: "LG"
      }
    );
    if (result) {
      return window.location.reload();
    }
  }

  async function onClickDelete(key,key2) {
    const result = await CustomDialog(
      <ModalStatusSchedules idSchedule={key} status = {key2} />,
      {
        title: "Editar Status do Agendamento",
        showCloseIcon: true,
      }
    );
    if (result) {
      return history.push(props.hrefPage);
    }
  }

  function styleStatus(){
    if (props.namePage === "Abertos") {
      return "info"; 
    }else if(props.namePage === "Pendentes"){
      return "warning"; 
    }else if(props.namePage === "Concluídos"){
      return "success";  
    }else{
      return "danger"; 
    }
  }

  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-md-6">
                <h1>Detalhes do Agendamento</h1>
              </div>
              {/* <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href={props.hrefPage}>{props.namePage}</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Detalhes do Agendamento
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
                      <div className="col-12 col-sm-6">
                        <div className="info-box">
                          <div className="info-box-content">
                            <span className="info-box-text text-center text-bold">
                              Tipo de Serviço
                            </span>
                            <span
                              style={{ color: "#4F4F4F" }}
                              className="info-box-number text-center mb-0"
                            >
                              {schedules.tipo}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="info-box bg-gray-light">
                          <div className="info-box-content">
                            <span className="info-box-text text-center text-bold">
                              Status
                            </span>
                            <span
                              className={"info-box-number text-center mb-0 text-"+ styleStatus()}
                            >
                              {schedules.status}
                            </span>
                          </div>
                          <div className="info-box-icon">
                            <button
                              style={{ width: 40, height: 40, border: "none"}}
                              className= {"btn btn-outline-" + styleStatus()}
                              onClick={async () => onClickDelete(schedules.id,schedules.status)}
                              disabled={statusButton()}
                            >
                              <i className="fas fa-sync-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="info-box">
                          <div className="info-box-content">
                            <span className="info-box-text text-center text-bold">
                              Registrado em
                            </span>
                            <span
                              style={{ color: "#4F4F4F" }}
                              className="info-box-number text-center mb-0"
                            >
                              {moment(schedules.registrado_em).format(
                                "DD/MM/YYYY  HH:mm"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="info-box">
                          <div className="info-box-content">
                            <span className="info-box-text text-center text-bold">
                              Agendado Para
                            </span>
                            <span
                              style={{ color: "#4F4F4F" }}
                              className="info-box-number text-center mb-0"
                            >
                              {moment(schedules.agendado_em).format(
                                "DD/MM/YYYY  HH:mm"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="info-box">
                          <div className="info-box-content">
                            <span className="info-box-text text-center text-bold">
                              Última modificação de Status
                            </span>
                            <span
                              style={{ color: "#4F4F4F" }}
                              className="info-box-number text-center mb-0"
                            >
                              {moment(schedules.atualizado_em).format(
                                "DD/MM/YYYY  HH:mm"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Número de Protocolo:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {schedules.uu_Id}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Solicitante:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {schedules.nome}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>E-mail:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {schedules.email}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Telefone:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {new StringMask("(99)99999-9999").apply(schedules.fone)}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Assunto:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {schedules.assunto}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Descrição:</label>
                      <label
                        style={{ color: "#4F4F4F" }}
                        className="form-control"
                      >
                        {schedules.mensagem}
                      </label>
                    </div>
                    <div style = {{marginTop: 20}} className="float-right">
                      <button
                        style={{ marginRight: 10 }}
                        id="editar"
                        className="btn btn-outline-primary"
                        onClick={async () => onClickUpdate(schedules.id)}
                        disabled={statusButton()}
                      >
                        Editar
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

export default DetailsSchedules;
