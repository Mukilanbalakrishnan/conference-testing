import React, { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const styles = {
    overlay: {

      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // dim background
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    body: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "550px",   // increase width
     minHeight: "300px",  // increase height
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.body}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
