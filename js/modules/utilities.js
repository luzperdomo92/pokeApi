export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const hideSpinner = ()=> {
  const spinner = document.querySelector('.js-spinner');
  spinner.style.display = 'none';
}

export const showSpinner = ()=> {
  const spinner = document.querySelector('.js-spinner');
  spinner.style.display = 'block';
}

export const alertFinalList = () => {
  const alert = document.querySelector('.js-final-alert');
  alert.style.display = 'block';
}
