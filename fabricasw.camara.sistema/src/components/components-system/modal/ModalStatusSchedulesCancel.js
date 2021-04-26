import React from "react";
import apiRegistro from "../../../services/ApiRegistro";
import {
  ModalContent,
  ModalFooter,
  ModalButton,
  useDialog,
} from "react-st-modal";

function ModalStatusSchedulesCancel(props) {
  const dialog = useDialog();

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "CancelStatus.js";
    script.async = true;

    document.body.appendChild(script);
  }
  
  async function onClickChangeStatus() {
    try {
      const result = await apiRegistro.post("/id/" + props.idSchedule + "/status/" + 6);
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
              Deseja cancelar o agendamento do(a) Sr(a) <span style={{fontWeight:"bold"}} className = "text-primary">{props.solicitante}</span>? 
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
            onClick={onClickChangeStatus}
          >
            Confirmar
          </ModalButton>
        </div>
      </ModalFooter>
    </div>
  );
}

export default ModalStatusSchedulesCancel;
