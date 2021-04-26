import React, { useState, useEffect, useRef } from "react";
import apiRegistro from "../../../services/ApiRegistro";
import StringMask from "string-mask";
import InputMask from "react-input-mask";
import {
  ModalContent,
  ModalFooter,
  ModalButton,
  useDialog,
} from "react-st-modal";

function ModalUpdateSchedules(props) {
  const dialog = useDialog();

  const [newValues, setNewValues] = useState([]);
  let btnRef = useRef();

  useEffect(() => {
    const fetchSchedules = async () => {
      const result = await apiRegistro.get("/id/" + props.idSchedule);

      setNewValues(result.data);
    };

    fetchSchedules();
  }, [props.idSchedule]);

  function onChange(event) {
    const { value, name } = event.target;

    setNewValues({
      ...newValues,
      [name]: value,
    });
  }

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "UpdateSchedule.js";
    script.async = true;

    document.body.appendChild(script);
  }

  async function onSubmit() {
    const val =
      validarAssunto() +
      validarDescricao() +
      validarEmail() +
      validarSolicitante() +
      validarTelefone();
    if (val === 5) {
      if (btnRef.current) {
        btnRef.current.setAttribute("disabled", "disabled");
        try {
          const result = await apiRegistro.put("/Update", {
            id: newValues.id,
            tipo: newValues.tipo,
            assunto: newValues.assunto,
            mensagem: newValues.mensagem,
            nome: newValues.nome,
            fone: newValues.fone.replace(/\D/g, ""),
            email: newValues.email,
            registrado_em: newValues.registrado_em,
            usuario: props.idUser,
            uu_id: newValues.uu_Id,
          });
          if (result.status === 200) {
            loadToastr("Success");
            setTimeout(() => {
              return dialog.close(true);
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          loadToastr("Fail");
        }
      }
    }
  }

  function validarAssunto() {
    if (newValues.assunto.length !== 0) {
      document.getElementById("errAssunto").innerHTML = "";
      return true;
    } else {
      document.getElementById("errAssunto").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarDescricao() {
    if (newValues.mensagem.length !== 0) {
      document.getElementById("errDesc").innerHTML = "";
      return true;
    } else {
      document.getElementById("errDesc").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarSolicitante() {
    if (newValues.nome.length !== 0) {
      document.getElementById("errNome").innerHTML = "";
      return true;
    } else {
      document.getElementById("errNome").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  function validarEmail() {
    if (newValues.email.length === 0) {
      document.getElementById("errEmail").innerHTML = "Campo Vazio!";
      return false;
    } else if (
      newValues.email.indexOf("@") !== -1 &&
      (newValues.email.indexOf(".com") !== -1 ||
        newValues.email.indexOf(".com.br") !== -1)
    ) {
      document.getElementById("errEmail").innerHTML = "";
      return true;
    } else {
      document.getElementById("errEmail").innerHTML = "Insira um Email Válido!";
      return false;
    }
  }

  function validarTelefone() {
    if (newValues.fone.replace(/\D/g, "").length !== 0) {
      if (
        newValues.fone.replace(/\D/g, "").length === 11 ||
        newValues.fone.replace(/\D/g, "").length === 10
      ) {
        document.getElementById("errFone").innerHTML = "";
        return true;
      } else {
        document.getElementById("errFone").innerHTML =
          "Insira um Telefone Válido!";
        return false;
      }
    } else {
      document.getElementById("errFone").innerHTML = "Campo Vazio!";
      return false;
    }
  }

  return (
    <div>
      <ModalContent>
        <div className="form-group">
          <label htmlFor="inputName">Número de Protocolo</label>
          <input
            type="text"
            id="inputName"
            name="uu_Id"
            className="form-control"
            onChange={onChange}
            defaultValue={newValues.uu_Id}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputName">Tipo de Serviço</label>
          <select
            className="form-control"
            id="inputName"
            name="tipo"
            onChange={onChange}
            value={newValues.tipo}
          >
            <option>ORIENTAÇÃO</option>
            <option>MEDIAÇÃO</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="inputName">Assunto</label>
          <div className="input-group">
            <input
              type="text"
              id="inputName"
              name="assunto"
              className="form-control"
              defaultValue={newValues.assunto}
              onChange={onChange}
              onBlur={validarAssunto}
              placeholder="Insira o Assunto aqui"
              required
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-heading" />
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
            id="errAssunto"
            className="Erros"
          ></span>
        </div>
        <div className="form-group">
          <label htmlFor="inputName">Descrição</label>
          <div className="input-group">
            <textarea
              id="inputName"
              name="mensagem"
              className="form-control"
              defaultValue={newValues.mensagem}
              onChange={onChange}
              onBlur={validarDescricao}
              placeholder="Insira a Descrição aqui"
              required
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fa fa-list" />
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
            id="errDesc"
            className="Erros"
          ></span>
        </div>
        <div className="form-group">
          <label htmlFor="inputName">Solicitante</label>
          <div className="input-group">
            <input
              type="text"
              id="inputName"
              name="nome"
              className="form-control"
              defaultValue={newValues.nome}
              onChange={onChange}
              onBlur={validarSolicitante}
              placeholder="Insira o Nome do Solicitante aqui"
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
              paddingTop: 7,
            }}
            id="errNome"
            className="Erros"
          ></span>
        </div>
        <div className="form-group">
          <label htmlFor="inputName">E-mail</label>
          <div className="input-group">
            <input
              type="text"
              id="inputName"
              name="email"
              className="form-control"
              defaultValue={newValues.email}
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
              paddingTop: 7,
            }}
            id="errEmail"
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
              defaultValue={new StringMask("(99)99999-9999").apply(
                newValues.fone
              )}
              value={newValues.fone}
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
              paddingTop: 7,
            }}
            id="errFone"
            className="Erros"
          ></span>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer justify-content-between">
          <ModalButton
            style={{ border: "1px solid" }}
            type="button"
            className="btn btn-outline-danger"
            onClick={() => {
              dialog.close(false);
            }}
          >
            Cancelar
          </ModalButton>
          <ModalButton
            type="button"
            ref={btnRef}
            className="btn btn-outline-primary"
            onClick={onSubmit}
          >
            Salvar
          </ModalButton>
        </div>
      </ModalFooter>
    </div>
  );
}

export default ModalUpdateSchedules;
