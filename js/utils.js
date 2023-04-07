const ALERT_SHOW_TIME = 5000;
const TIMEOUT = 500;

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
  const alertContainer = document.querySelector('.show-alert');
  alertContainer.classList.remove('hidden');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export const debounce = (cb, timeoutDelay = TIMEOUT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};
