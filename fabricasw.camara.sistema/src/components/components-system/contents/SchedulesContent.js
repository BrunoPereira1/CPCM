import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import apiRegistro from "../../../services/ApiRegistro";
import ModalStatusSchedulesCancel from "../modal/ModalStatusSchedulesCancel";
import { CustomDialog } from "react-st-modal";

const SchedulesContent = (props) => {
  const [schedules, setSchedules] = useState([]);
  const history = useHistory();

  function loadScript() {
    const script = document.createElement("script");

    script.src = "js/contentTables.js";
    script.async = true;

    document.body.appendChild(script);
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      const result = await apiRegistro.get(props.typeRequest);
      setSchedules(result.data);
    };
    fetchSchedules();
    setTimeout(() => {
      loadScript();
    }, 300);
  }, [props.typeRequest]);

  function ClickSchedules(key) {
    history.push({
      pathname: "/Details",
      state: {
        idSchedule: key,
        namePage: props.namePage,
        hrefPage: props.hrefPage,
        menuConfig: props.menuConfig,
      },
    });
  }

  async function CancelSchedule(key, key2) {
    const result = await CustomDialog(
      <ModalStatusSchedulesCancel idSchedule={key} solicitante={key2} />,
      {
        title: "Cancelar Agendamento",
        showCloseIcon: true,
      }
    );
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
                <h1>{props.namePage}</h1>
              </div>
              {/* <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">{props.namePage}</li>
                </ol>
              </div> */}
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Protocolo</th>
                          <th>Serviço</th>
                          <th>Assunto</th>
                          <th>Solicitante</th>
                          <th>Data</th>
                          <th>Status</th>
                          <th>Detalhes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules.map((schedules) => {
                          if (
                            (schedules.status === "ABERTO" ||
                              schedules.status === "VERIFICADO") &&
                            props.namePage === "Abertos"
                          ) {
                            return (
                              <tr key={schedules.id}>
                                <td>{schedules.uu_Id}</td>
                                <td>{schedules.tipo}</td>
                                <td>{schedules.assunto}</td>
                                <td>{schedules.nome}</td>
                                <td>
                                  {moment(schedules.agenda_em).format(
                                    "DD/MM/YYYY  HH:mm"
                                  )}
                                </td>
                                <td
                                  style={{ fontWeight: "bold" }}
                                  className={
                                    schedules.status === "ABERTO"
                                      ? "text-info"
                                      : "text-primary"
                                  }
                                >
                                  {schedules.status}
                                </td>
                                <td className="project-actions text-center">
                                  <button
                                    style={{ marginRight: 5 }}
                                    className={"btn btn-info  btn-sm"}
                                    onClick={() => ClickSchedules(schedules.id)}
                                  >
                                    <i className="fas fa-ellipsis-h"></i>
                                  </button>
                                  <button
                                    style={{ marginRight: 3 }}
                                    className={"btn btn-danger btn-sm"}
                                    onClick={async () =>
                                      CancelSchedule(
                                        schedules.id,
                                        schedules.nome
                                      )
                                    }
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          } else if (
                            (schedules.status === "REALIZADO" ||
                              schedules.status === "PROCESSADO") &&
                            props.namePage === "Pendentes"
                          ) {
                            return (
                              <tr key={schedules.id}>
                                <td>{schedules.uu_Id}</td>
                                <td>{schedules.tipo}</td>
                                <td>{schedules.assunto}</td>
                                <td>{schedules.nome}</td>
                                <td>
                                  {moment(schedules.agenda_em).format(
                                    "DD/MM/YYYY  HH:mm"
                                  )}
                                </td>
                                <td
                                  style={
                                    schedules.status === "REALIZADO"
                                      ? { fontWeight: "bold", color: "#ffc107" }
                                      : { fontWeight: "bold", color: "#FF8C00" }
                                  }
                                >
                                  {schedules.status}
                                </td>
                                <td className="project-actions text-center">
                                  <button
                                    style={{ marginRight: 3 }}
                                    className={"btn btn-warning btn-sm"}
                                    onClick={() => ClickSchedules(schedules.id)}
                                  >
                                    <i className="fas fa-ellipsis-h"></i>
                                  </button>
                                  <button
                                    style={{ marginRight: 3 }}
                                    className={"btn btn-danger btn-sm"}
                                    onClick={async () =>
                                      CancelSchedule(
                                        schedules.id,
                                        schedules.nome
                                      )
                                    }
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          } else if (
                            schedules.status === "ENCERRADO" &&
                            props.namePage === "Concluídos"
                          ) {
                            return (
                              <tr key={schedules.id}>
                                <td>{schedules.uu_Id}</td>
                                <td>{schedules.tipo}</td>
                                <td>{schedules.assunto}</td>
                                <td>{schedules.nome}</td>
                                <td>
                                  {moment(schedules.agenda_em).format(
                                    "DD/MM/YYYY  HH:mm"
                                  )}
                                </td>
                                <td
                                  style={{ fontWeight: "bold" }}
                                  className="text-success"
                                >
                                  {schedules.status}
                                </td>
                                <td className="project-actions text-center">
                                  <button
                                    className={"btn btn-success btn-sm"}
                                    onClick={() => ClickSchedules(schedules.id)}
                                  >
                                    <i className="fas fa-ellipsis-h"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          } else if (
                            schedules.status === "CANCELADO" &&
                            props.namePage === "Cancelados"
                          ) {
                            return (
                              <tr key={schedules.id}>
                                <td>{schedules.uu_Id}</td>
                                <td>{schedules.tipo}</td>
                                <td>{schedules.assunto}</td>
                                <td>{schedules.nome}</td>
                                <td>
                                  {moment(schedules.agenda_em).format(
                                    "DD/MM/YYYY  HH:mm"
                                  )}
                                </td>
                                <td
                                  style={{ fontWeight: "bold" }}
                                  className="text-danger"
                                >
                                  {schedules.status}
                                </td>
                                <td className="project-actions text-center">
                                  <button
                                    className={"btn btn-danger btn-sm"}
                                    onClick={() => ClickSchedules(schedules.id)}
                                  >
                                    <i className="fas fa-ellipsis-h"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          {/* <th>Protocolo</th>
                          <th>Serviço</th>
                          <th>Assunto</th>
                          <th>Solicitante</th>
                          <th>Data</th>
                          <th>Status</th>
                          <th>Detalhes</th> */}
                        </tr>
                      </tfoot>
                    </table>
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

export default SchedulesContent;
