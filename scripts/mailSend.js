window.addEventListener("load", function () {
  // TRAEMOS LOS ELEMENTOS HTML QUE NECESITAMOS
  const formulario = document.querySelector("#contact-form");
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const message = document.querySelector("#message");
  const loader = document.querySelector(".loader");

  // LOGICA DEL BOTON ENVIAR
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    //TRAEMOS LA INFORMACION DEL FORMULARIO
    const datos = new FormData(formulario);

    // INICIA LA ANIMACION LOADER
    loader.classList.remove("oculto");

    // HACEMOS PETICION A LA API
    fetch("./scripts/mailContacto.php", {
      method: "POST",
      body: datos,
    })
      .then((response) => response.json())
      .then((data) => {
        if ("exito") {
          // SI RESPONDE OK SACAMOS LA ANIMACION LOADER Y VACIAMOS LOS INPUTS
          loader.classList.add("oculto");
          name.value = "";
          email.value = "";
          phone.value = "";
          message.value = "";

          // TIRAMOS SWEET ALERT DE SUCCESS
          Swal.fire({
            title: "Mensaje enviado",
            text: "¡Nos pondremos en contacto a la brevedad!",
            icon: "success",
            confirmButtonText: "Volver",
            confirmButtonColor: "#e96c29",
            confirmButtonAriaLabel: "Volver",
          });
        } else {
          // SI RESPONDE MAL SACAMOS LA ANIMACION LOADER Y VACIAMOS LOS INPUTS
          loader.classList.add("oculto");
          name.value = "";
          email.value = "";
          phone.value = "";
          message.value = "";

          // TIRAMOS SWEET ALERT DE ERROR
          Swal.fire({
            title: "Error",
            text: "No pudimos enviar tu mensaje, intentalo de nuevo más tarde",
            icon: "error",
            confirmButtonText: "Volver",
            confirmButtonColor: "#e96c29",
            confirmButtonAriaLabel: "Volver",
          });
        }
      })
      .catch((error) => {
        // SI OCURRE UN ERROR SACAMOS LA ANIMACION LOADER Y VACIAMOS LOS INPUTS
        loader.classList.add("oculto");
        name.value = "";
        email.value = "";
        phone.value = "";
        message.value = "";

        // TIRAMOS SWEET ALERT DE ERROR
        Swal.fire({
          title: "Atención",
          text: "Ocurrió un error inesperado, intentalo de nuevo más tarde",
          icon: "warning",
          confirmButtonText: "Volver",
          confirmButtonColor: "#e96c29",
          confirmButtonAriaLabel: "Volver",
        });
      });
  });
});
