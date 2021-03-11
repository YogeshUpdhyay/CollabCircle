import React from 'react';
import ReactDom from 'react-dom';
import {
Button
} from '@material-ui/core';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({open, onClose, handleDelete}) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        Are you sure you want to delete your account?
        <Button onClick={(e)=>{handleDelete(e)} } variant = "filled" style = {{backgroundColor:'#782387' , color:'#ffffff'}}>Yes</Button>
        <Button onClick={onClose} variant = "filled" style = {{backgroundColor:'#782387' , color:'#ffffff'}}>No</Button>
      </div>
    </>,
    document.getElementById('portal')
  )
}
