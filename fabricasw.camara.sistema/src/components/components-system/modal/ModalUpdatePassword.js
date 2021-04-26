import React, { useState, useEffect, useRef } from "react";
import apiUsuario from "../../../services/ApiUsuario";
import {
  ModalContent,
  ModalFooter,
  ModalButton,
  useDialog,
} from "react-st-modal";

function ModalUpdatePassword(props) {
  const dialog = useDialog();

  let btnRef = useRef();

  const [valueUser, setValueUser] = useState([]);
  const [newPassword, setNewPassword] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const result = await apiUsuario.get("/id/" + props.idUser);

      setValueUser(result.data);
    };

    fetchSchedules();
  }, [props.idUser]);

  function onChange(event) {
    const { value, name } = event.target;

    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  }

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "UpdatePassword.js";
    script.async = true;

    document.body.appendChild(script);
  }

  async function onPasswordChange() {
    if (newPassword.senhaVelha === valueUser.senha) {
      if (newPassword.senhaVelha !== newPassword.senhaNova) {
        if (newPassword.senhaNova === newPassword.senhaNovaConf) {
          if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
          try {
            const result = await apiUsuario.put("/Update/", {
              id: valueUser.id, 
              nome: valueUser.nome,
              fone: valueUser.fone,
              email: valueUser.email,
              login: valueUser.login,
              senha: newPassword.senhaNovaConf,
              ativo: valueUser.ativo,
              id_funcao: valueUser.id_funcao,
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
        } else {
          loadToastr("Erro1");
        }
      } else {
        loadToastr("Erro3");
      }
    } else {
      loadToastr("Erro2");
    }
  }

  return (
    <div>
      <ModalContent>
        <div className="form-group">
          <label htmlFor="inputName">Senha Atual</label>
          <input
            type="password"
            id="inputName"
            name="senhaVelha"
            className="form-control"
            placeholder="Insira o senha atual"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputName">Nova Senha</label>
          <input
            type="password"
            id="inputName"
            name="senhaNova"
            className="form-control"
            placeholder="Insira a nova senha"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputName">Confirmar Nova Senha</label>
          <input
            type="password"
            id="inputName"
            name="senhaNovaConf"
            className="form-control"
            placeholder="Confirme a nova senha"
            onChange={onChange}
            required
          />
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
            onClick={onPasswordChange}
          >
            Salvar
          </ModalButton>
        </div>
      </ModalFooter>
    </div>
  );
}

export default ModalUpdatePassword;
