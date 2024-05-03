

export const validateAppointmentForm = (formData) => {
  const { date, time} = formData

  let errors = {};

  if(!date) errors = {date: "Elige una fecha"}
  else if(!time) errors = {time: "Elige una hora"}
  else if(Number(time.split(':')[0]) < 8 || Number(time.split(':')[0] > 20)) errors = {time: "El horario disponible esta entre las 8hs y las 20hs"}
  else errors = {}

  return errors

}