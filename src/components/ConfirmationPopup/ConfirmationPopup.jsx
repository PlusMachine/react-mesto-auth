import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function PopupWithConfirmation({ title, isOpen, onClose, buttonText, onSubmit, card }) {
  function handleSubmitClickDelete(event) {
    event.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmitClickDelete}
      title={title}
      name='popup-confirm'
    />
  )
}