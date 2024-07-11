window.addEventListener("load", () => {
    const email = document.getElementById("email");
    const pass = document.getElementById("pass");
    const form = document.getElementById("form");
    const parrafo = document.getElementById("warnings");
    const url = "https://feddupetre.pythonanywhere.com/login";

    var validacionesOk = [false, false];

    let emailValor, passValor;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validaCampos();

      let flagTodoValido = true;

      for(let flag of validacionesOk){
        if(!flag){
          flagTodoValido = false;
        }
      }

      if(flagTodoValido){
        const formdata = new FormData();
        formdata.append("email", emailValor);
        formdata.append("contrasenia", passValor);
        fetch(url, {method: 'POST', body: formdata}).then(response=> response.json()).then(data=> {
          if(data.mensaje) {
            alert(data.mensaje);
            limpiarFormulario();

            if(data.mensaje != "Verifica tus datos"){
              setTimeout(()=>{
                window.location.href = "./index.html"
              }, 2000)
            }
          } else {
            alert("Ha ocurrido algún error al registrarte");
            limpiarFormulario();
          }
        });
      }

    });
  
    const validaCampos = () => {
      // Captura los valores ingresados por el usuario
      emailValor = email ? email.value.trim() : "";
      passValor = pass ? pass.value.trim() : "";
  
      // Validación email
      if (!emailValor) {
        validaFalla(email, "campo vacio");
      } else if (!validaEmail(emailValor)) {
        validaFalla(email, "El email no es valido");
      } else {
        validaOk(email);
        validacionesOk[0] = true
      }
  
      // Validación password
      const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Al menos una mayúscula y un número, mínimo 8 caracteres
      if (!passValor) {
        validaFalla(pass, "campo vacio");
      } else if (passValor.length < 8) {
        validaFalla(pass, "debe tener 8 caracteres");
      } else if (!passRegex.test(passValor)) {
        validaFalla(pass, 'Debe tener al menos una mayúscula y un número');
      } else {
        validaOk(pass);
        validacionesOk[1] = true
      }
  
    
    };
  
    const validaFalla = (input, msje) => {
      if (input) {
        const formControl = input.parentElement;
        const aviso = formControl.querySelector("p");
        if (aviso) {
          aviso.innerText = msje;
        }
        formControl.className = "form-control falla";
      }
    };
  
    const validaOk = (input) => {
      if (input) {
        const formControl = input.parentElement;
        formControl.className = "form-control ok";
      }
    };
  
    const validaEmail = (email) => {
      return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email);
    };
  });

  function limpiarFormulario(){
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";
  }
  