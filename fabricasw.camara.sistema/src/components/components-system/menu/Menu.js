import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContex from "../../store/Context";

import logo1 from "../../../favicon.png";

export default function Menu(props) {
  const { funcao } = useContext(StoreContex);
  const configMenu = {
    menuOpen: [
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
    ],
    menuActive: [
      "nav-link",
      "nav-link",
      "nav-link",
      "nav-link",
      "nav-link",
      "nav-link",
      "nav-link",
    ],
  };
  const history = useHistory();

  configMenu.menuOpen[props.menuConfig] = "nav-item menu-open";
  configMenu.menuActive[props.menuConfig] = "nav-link active";

  function onClickDash() {
    history.push("/Dash");
  }

  function onClickFuncionarios() {
    history.push("/UsersManager");
  }

  function onClickSchedule() {
    history.push("/NewSchedule");
  }

  function onClickOpen() {
    history.push("/SchedulesOpen");
  }

  function onClickPending() {
    history.push("/SchedulesPending");
  }

  function onClickComplete() {
    history.push("/SchedulesComplete");
  }

  function onClickCancel() {
    history.push("/SchedulesCancel");
  }
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <p
        style={{ cursor: "pointer" }}
        className="brand-link navbar text-center"
        onClickCapture={onClickDash}
      >
        <img
          src={logo1}
          alt="Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">CPCM</span>
      </p>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-3">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
              with font-awesome or any other icon font library */}

            <li
              style={funcao === "1" ? {} : { display: "none" }}
              className="nav-header"
            >
              SISTEMA
            </li>
            <li
              style={funcao === "1" ? {} : { display: "none" }}
              className={configMenu.menuOpen[5]}
            >
              <span
                style={{ color: "#c2c7d0", cursor: "pointer" }}
                className={configMenu.menuActive[5]}
                onClickCapture={onClickDash}
              >
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </span>
            </li>
            <li
              style={funcao === "1" ? {} : { display: "none" }}
              className={configMenu.menuOpen[6]}
            >
              <span
                style={{ color: "#c2c7d0", cursor: "pointer" }}
                className={configMenu.menuActive[6]}
                onClickCapture={onClickFuncionarios}
              >
                <i className="nav-icon fa fa-users" />
                <p>Funcionários</p>
              </span>
            </li>
            <li className="nav-header">SERVIÇOS</li>
            <li className={configMenu.menuOpen[0]}>
              <span
                style={{ color: "#c2c7d0", cursor: "pointer" }}
                className={configMenu.menuActive[0]}
                onClickCapture={onClickSchedule}
              >
                <i className="nav-icon fas fa-calendar-alt" />
                <p>Agendamentos</p>
              </span>
            </li>
            <li className="nav-header">CONSULTAR</li>
            <li className={configMenu.menuOpen[1]}>
              <span
                style={{ color: "#c2c7d0", cursor: "pointer" }}
                className={configMenu.menuActive[1]}
                onClickCapture={onClickOpen}
              >
                <i className="nav-icon far fa-calendar text-info" />
                <p>Abertos</p>
              </span>
            </li>
            <li className={configMenu.menuOpen[2]}>
              <span
                style={{ color: "#c2c7d0", cursor: "pointer" }}
                className={configMenu.menuActive[2]}
                onClickCapture={onClickPending}
              >
                <i className="fas fa-spinner nav-icon text-warning" />
                <p>Pendentes</p>
              </span>
            </li>
            <li className={configMenu.menuOpen[3]}>
              <span
                style={{ color: "#c2c7d0", cursor: "pointer" }}
                className={configMenu.menuActive[3]}
                onClickCapture={onClickComplete}
              >
                <i className="fas fa-check nav-icon text-success" />
                <p>Concluidos</p>
              </span>
            </li>
            <li className={configMenu.menuOpen[4]}>
              <span
                style={{ color: "#c2c7d0", cursor: "pointer" }}
                className={configMenu.menuActive[4]}
                onClickCapture={onClickCancel}
              >
                <i className="fas fa-times nav-icon text-danger" />
                <p>Cancelados</p>
              </span>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
