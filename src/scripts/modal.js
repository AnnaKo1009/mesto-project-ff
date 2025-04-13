function escClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    } 
}

function openModal(modal) {
    modal.classList.add('popup_is-animated');
    modal.classList.add('popup_is-opened'); 
    document.addEventListener('keydown', escClose); 
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');  
    document.removeEventListener('keydown', escClose); 
}

function addCloseListener(popupElement) {
    const popupCloseButton = popupElement.querySelector('.popup__close');
    
    popupCloseButton.addEventListener('click', () => {
        closeModal(popupElement); 
    });
    
    popupElement.addEventListener('mousedown', function(evt) {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup')) { 
            closeModal(popupElement);
        }
    });
}

export { openModal, closeModal, addCloseListener};




