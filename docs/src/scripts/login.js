window.addEventListener("load", () => {
    const email = document.getElementById("email");
    const pass = document.getElementById("pass");
    const form = document.getElementById("form");
    const parrafo = document.getElementById("warnings");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validaCampos();
    });
  
    const validaCampos = () => {
      // Captura los valores ingresados por el usuario
      const emailValor = email ? email.value.trim() : "";
      const passValor = pass ? pass.value.trim() : "";
  

  
      // Validación email
      if (!emailValor) {
        validaFalla(email, "campo vacio");
      } else if (!validaEmail(emailValor)) {
        validaFalla(email, "El email no es valido");
      } else {
        validaOk(email);
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
  