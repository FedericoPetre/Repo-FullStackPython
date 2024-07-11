window.addEventListener("load", () => {
  const name = document.getElementById("name");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const pass = document.getElementById("pass");
  const passConf = document.getElementById("passConf");
  const form = document.getElementById("form");
  const parrafo = document.getElementById("warnings");
  const url = "https://feddupetre.pythonanywhere.com/registrar_usuario";

  var validacionesOk = [false, false, false, false, false];

  let nameValor, lastValor, emailValor, passValor, passConfValor;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validaCampos();

    flagTodoValido = true;

    for(let flag of validacionesOk){
      if(!flag){
        flagTodoValido = false;
      }
    }

    if(flagTodoValido){
      const formdata = new FormData();
      formdata.append("nombre", nameValor);
      formdata.append("apellido", lastValor);
      formdata.append("email", emailValor);
      formdata.append("contrasenia", passValor);
      fetch(url, {method: 'POST', body: formdata}).then(response=> response.json()).then(data=> {
        if(data.mensaje) {
          alert(data.mensaje);
          form.reset();
        } else {
          alert("Ha ocurrido algún error al registrarte");
          form.reset();
        }
      });
    }

  });

  const validaCampos = () => {
    // Captura los valores ingresados por el usuario
    nameValor = name ? name.value.trim() : "";
    lastValor = lastname ? lastname.value.trim() : "";
    emailValor = email ? email.value.trim() : "";
    passValor = pass ? pass.value.trim() : "";
    passConfValor = passConf ? passConf.value.trim() : "";

    // Validación nombre
    if (!nameValor) {
      console.log("campo vacio");
      validaFalla(name, "campo vacio");
    } else {
      validaOk(name);
      validacionesOk[0] = true;
    }

    // Validación apellido
    if (!lastValor) {
      console.log("campo vacio");
      validaFalla(lastname, "campo vacio");
    } else {
      validaOk(lastname);
      validacionesOk[1] = true;
    }

    // Validación email
    if (!emailValor) {
      validaFalla(email, "campo vacio");
    } else if (!validaEmail(emailValor)) {
      validaFalla(email, "El email no es valido");
    } else {
      validaOk(email);
      validacionesOk[2] = true;
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
      validacionesOk[3] = true;
    }

    // Validación confirmar password
    if (!passConfValor) {
      validaFalla(passConf, 'Confirme su contraseña');
    } else if (passValor !== passConfValor) {
      validaFalla(passConf, 'las contraseñas no coinciden');
    } else {
      validaOk(passConf);
      validacionesOk[4] = true;
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
