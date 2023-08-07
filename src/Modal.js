import React from 'react'
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '#454545',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
  zIndex: 1000,
  height: '80%',
  width: '90%',
  color: '#E3FCBF',
  textAlign: 'center'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .6)',
  zIndex: 100
}

export default function Modal({ children, onClose }) {
  return (
    <>
      {createPortal(
        <>
          <div style={OVERLAY_STYLES} />
          <div style={MODAL_STYLES}>
            <button className='btn btn-danger' style={{ marginLeft: "92%", marginTop: "2%" }} onClick={onClose}><CloseIcon /></button>
            {children}
          </div>
        </>,
        document.getElementById('cart-root')
      )}
    </>
  );
}
