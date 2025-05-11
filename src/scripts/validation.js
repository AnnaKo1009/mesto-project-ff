// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
    // Выбираем элемент ошибки на основе уникального класса 
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(config.errorClass);

  };
  
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement, config) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(config.errorClass);
  
  };

  // Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement, config);
    }
  };
  

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };


export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
         
      });
      setEventListeners(formElement, config);
    });
  };

// проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; 

// отключаем и включаем кнопку
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }; 

//очищаем ошибки валидации формы и делаем кнопку неактивной
  export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
      inputElement.setCustomValidity('');
    });
    toggleButtonState(inputList, buttonElement, config);
  };