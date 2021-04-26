import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import apiUsuario from "../../../services/ApiUsuario";
import StoreContex from "../../store/Context";
//import moment from "moment";
import "moment/locale/pt-br";

export default function Header(props) {
  const [user, setUser] = useState([]);
  const { setToken, setFuncao, setId, id } = useContext(StoreContex);
  const history = useHistory();

  useEffect(() => {
    const fetchSchedules = async () => {
      const result = await apiUsuario.get("/id/" + id);
      //console.log(result);
      setUser(result.data);
    };
    fetchSchedules();
  }, [id]);

  function onClickConfig() {
    history.push("/Config");
  }

  function onClickLogout() {
    setToken(null);
    setId(null);
    setFuncao(null);
    history.push("/");
  }

  return (
    <nav style = {{backgroundColor: "#25aae1"}} className="main-header navbar navbar-expand navbar-dark">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
            }}
            className="nav-link"
            data-widget="pushmenu"
          >
            <i className="fas fa-bars" />
          </button>
        </li>
        {/*<li className="nav-item d-none d-sm-inline-block">
          <a href="" className="nav-link">
            Inicio
          </a>
        </li>*/}
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* navbar user panel */}
        <li className="nav-item dropdown user-menu">
          <Link
            to="/#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
          >
            <img
              src="../../dist/img/user2-160x160-2.jpg"
              className="user-image img-circle elevation-2"
              alt="ICONE"
            />
            <span className="d-none d-md-inline">{user.login}</span>
          </Link>
          <ul style = {{marginTop: 7}} className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            {/* User image */}
            <li style = {{backgroundColor: "#25aae1"}} className="user-header">
              <img
                src="../../dist/img/user2-160x160-2.jpg"
                className="img-circle elevation-2"
                alt="ICONE"
              />
              <p style = {{color: "white"}}>
                {user.nome}
                <small>
                  {user.funcao}
                </small>
              </p>
            </li>
            {/* Menu Footer*/}
            <li className="user-footer">
              <p
                className="btn btn-default btn-flat"
                onClickCapture={onClickConfig}
              >
                <i className="fas fa-cog " />
              </p>
              <p
                className="btn btn-default btn-flat float-right"
                onClickCapture={onClickLogout}
              >
                <i className="fas fa-sign-out-alt" />
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
