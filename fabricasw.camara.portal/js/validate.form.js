function Validate(form) {
    var formResult = ClearValidate();

    formResult = ValidateRequired(form, formResult);

    // formResult = ValidateMinLength(form, formResult);
    // formResult = ValidateMaxLength(form, formResult);
    // formResult = ValidateEmail(form, formResult);
    // formResult = ValidateFone(form, formResult);

    var camposObrigatorios = "";

    if (!formResult.IsValid) {
        if (formResult.ErrorsInput != "") {
            camposObrigatorios = `Campos Obrigatórios:${formResult.ErrorsInput}`;
        }
        if (formResult.ErrorsMinLength != "") {
            camposMinLength = `Mínimo de caracteres:${formResult.ErrorsMinLength}`;
        }
        if (formResult.ErrorsMaxLength != "") {
            camposMaxLength = `Máximo de caracteres:${formResult.ErrorsMaxLength}`;
        }
        if (formResult.ErrorsFormatacao != "") {
            camposFormatacao = `Erros de Formatação:${formResult.ErrorsFormatacao}`;
        }
        formResult.MessageError = `${typeof camposObrigatorios === "undefined" ? "" : camposObrigatorios}  
                                   ${typeof camposMinLength === "undefined" ? "" : camposMinLength} 
                                   ${typeof camposMaxLength === "undefined" ? "" : camposMaxLength} 
                                   ${typeof camposFormatacao === "undefined" ? "" : camposFormatacao}`;

        // ErrorMessage(formResult.MessageError);

        return false;
    }

    return true;
}

function RefreshValidate(form) {
    SetupCssDefault($(`${form} input`));
    $(`${form} input`).each(function () {
        var input = $(this);
        // console.log(input);
        input[0].value = "";
        SetupCssDefault(input);
    });

    SetupCssDefault($(`${form} textarea`));
    $(`${form} textarea`).each(function () {
        var input = $(this);
        input[0].value = "";
        SetupCssDefault(input);
    });
}

function ClearValidate() {
    return FormResult = {
        IsValid: true,
        ErrorsInput: "",
        ErrorsMinLength: "",
        ErrorsMaxLength: "",
        ErrorsFormatacao: "",
        MessageError: ""
    };
}

function ValidateRequired(form, formResult) {
    SetupCssDefault($(`${form} .required`));
    $(`${form} input.required`).each(function () {
        var input = $(this);
        if (!input.val()) {
            formResult.IsValid = false;
            SetupCssError(input);
            formResult.ErrorsInput += SetUpErro(input.data("field"));
        }
    });

    return formResult;
}

function SetupCssDefault(input) {
    input.css("background-color", "#f9f9f9");
    input.css("border", "1px solid #e5e6e7");
    // input.css("opacity: 0");
}

function SetupCssError(input) {
    input.css("background-color", "#f7b6b6");
    input.css("border", "1px solid #dc0b17");
    input.css("opacity: 0.3");
}

function SetUpErro(erro) {
    return `\n - ${erro}`;
}

