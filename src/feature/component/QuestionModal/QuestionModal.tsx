import React from "react";
import "./styles.css";

function QuestionModal({ onClose, isOpen, content }: QuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal" tabIndex={-1}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Qual a sua data de nascimento?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        {content}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Fechar</button>
        <button type="button" className="btn btn-primary" onClick={onClose}>Salvar</button>
      </div>
    </div>
  </div>
</div>
  );
}

export default QuestionModal;
