/* eslint-disable @typescript-eslint/no-explicit-any */
export const changePasswordValidation = (
  fieldName: string,
  value: string,
  form: any
) => {
  let error = "";

  if (fieldName === "oldPassword") {
    if (value.trim() === "") {
      error = "La contraseña anterior es obligatoria.";
    }
  }

  if (fieldName === "oldPassword") {
    if (value.trim() === "") {
      error = "La contraseña anterior es obligatoria.";
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

  if (fieldName === "newPassword") {
    if (value.trim() === "") {
      error = "La nueva contraseña es obligatoria.";
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
    } else if (value !== form.newPassword) {
      error = "Las contraseñas no coinciden.";
    }
  }

  return error;
};
