import React from "react";
import apiUsuario from "../../../services/ApiUsuario";
import {
  ModalContent,
  ModalFooter,
  ModalButton,
  useDialog,
} from "react-st-modal";

function ModalStatusUser(props) {
  const dialog = useDialog();
  

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "TradeStatus.js";
    script.async = true;

    document.body.appendChild(script);
  }
  
  function StatusChange(key){
	if (key === 1){
		if (props.statusUser === "S"){
			return "N";
		}else{
			return "S";
		}
	}else if (key === 2){
		if (props.statusUser === "S"){
			return "INATIVO";
		}else{
			return "ATIVO";
		}
	}else{
		if (props.statusUser === "S"){
			return "text-danger";
		}else{
			return "text-success";
		}
	}
  }

  async function onClickChangeStatus() {
    try {
      const result = await apiUsuario.post("/id/" + props.idUser + "/status/" + StatusChange(1));
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
              Deseja trocar o Status de <span style={{fontWeight:"bold"}} className = "text-primary">{props.user}</span>  para <span style={{fontWeight:"bold"}} className = {StatusChange(3)}>{StatusChange(2)}</span>?
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

export default ModalStatusUser;
