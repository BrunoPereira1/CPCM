import React from "react";
import apiUsuario from "../../../services/ApiUsuario";
import {
  ModalContent,
  ModalFooter,
  ModalButton,
  useDialog,
} from "react-st-modal";

function ModalResetPassword(props) {
  const dialog = useDialog();

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "ResetPass.js";
    script.async = true;

    document.body.appendChild(script);
  }

  async function onClickResetPass() {
    try {
      const result = await apiUsuario.post("/id/" + props.idUser);
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
  return (
    <div>
      <ModalContent>
      <div className="modal-body">
            <p>
              Deseja resetar a senha de <span style={{fontWeight:"bold"}} className = "text-primary">{props.user}</span>?
            </p>
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
            className="btn btn-outline-primary"
            onClick={onClickResetPass}
          >
            Confirmar
          </ModalButton>
        </div>
      </ModalFooter>
    </div>
  );
}

export default ModalResetPassword;

