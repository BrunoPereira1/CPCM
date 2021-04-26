import React from "react";
import apiRegistro from "../../../services/ApiRegistro";
import {
  ModalContent,
  ModalFooter,
  ModalButton,
  useDialog,
} from "react-st-modal";

function ModalStatusSchedules(props) {
  const dialog = useDialog();

  function loadToastr(string) {
    const script = document.createElement("script");

    script.src = "js/toastrMessage/toastr" + string + "TradeStatus.js";
    script.async = true;

    document.body.appendChild(script);
  }

  function StatusNumber(key,key2) {
    if (key === 1){
		switch (key2) {
		  case "ABERTO":
			return 1;
		  case "VERIFICADO":
			return 2;
		  case "REALIZADO":
			return 3;
		  case "PROCESSADO":
			return 4;
		  case "ENCERRADO":
			return 5;
		  default:
			return 0;
		}
	}else{
		switch (key2) {
		  case 2:
			return "VERIFICADO";
		  case 3:
			return "REALIZADO" ;
		  case 4:
			return "PROCESSADO";
		  case 5:
			return "ENCERRADO";
		  default:
			return null;
		}
	}
  }
  
  function StyleColor(key){
	if(key === 1 || key === 2){
		return "text-primary";
	}else if (key === 3 || key === 4){
		return "text-warning"
	}else{
		return "text-success";
	}
  }

  async function onClickChangeStatus() {
    try {
      const result = await apiRegistro.post(
        "/id/" + props.idSchedule + "/status/" + (StatusNumber(1,props.status) + 1)
      );
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
              Deseja trocar o Status de <span style={{fontWeight:"bold"}} className = {StyleColor(StatusNumber(1,props.status))}>{props.status}</span>  para  <span style={{fontWeight:"bold"}} className = {StyleColor(StatusNumber(1,props.status) + 1)}>{StatusNumber(2,StatusNumber(1,props.status) + 1)}</span>?
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

export default ModalStatusSchedules;
