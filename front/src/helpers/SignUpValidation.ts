/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerValidate = (fieldName: string, value: string, form: any) => {
  let error = "";

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]+$/;

  if (fieldName === "name") {
    if (value.trim() === "") {
      error = "El nombre es obligatorio.";
    } else if (!regexName.test(value)) {
      error = "El nombre solo puede contener letras y espacios.";
    }
  }

  if (fieldName === "email") {
    if (value.trim() === "") {
      error = "El correo electrónico es obligatorio.";
    } else if (!regexMail.test(value)) {
      error = "El correo electrónico no es válido.";
    }
  }

  if (fieldName === "password") {
    if (value.trim() === "") {
      error = "La contraseña es obligatoria.";
    } else if (value.length < 6) {
      error = "La contraseña debe tener al menos 6 caracteres.";
    } else if (!/[A-Z]/.test(value)) {
      error = "La contraseña debe contener al menos una letra mayúscula.";
    } else if (!/[0-9]/.test(value)) {
      error = "La contraseña debe contener al menos un número.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      error = "La contraseña debe contener al menos un carácter especial.";
    }
  }

  if (fieldName === "confirmPassword") {
    if (value.trim() === "") {
      error = "Repetir la contraseña es obligatorio.";
    } else if (value !== form.password) {
      error = "Las contraseñas no coinciden.";
    }
  }

  if (fieldName === "phone") {
    if (value.trim() === "") {
      error = "El teléfono es obligatorio.";
    } else if (!regexPhone.test(value)) {
      error = "El teléfono debe contener solo números.";
    }
  }

  return error;
};
