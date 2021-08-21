import React, { forwardRef, useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField } from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export function DialogEdit({ open, handleClose, serviceEditPost, post, setSelectPost, setUpdateList, updateList }) {

    return  <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >  
              <form noValidate autoComplete="off">
                <DialogTitle id="alert-dialog-slide-title">Editar</DialogTitle>
                <DialogContent>
                    <TextField 
                        id="title"
                        style={{ marginBottom: '10px' }}
                        fullWidth 
                        value={post.title}
                        label="Título da Postagem" 
                        InputLabelProps={{
                           shrink: true,
                        }}
                        onChange={({ target }) => {
                            setSelectPost({ ...post, title: target.value })
                        }}
                    />
                    <TextField 
                        id="description"
                        style={{ marginBottom: '10px' }}
                        fullWidth 
                        multiline  
                        value={post.description}
                        rows={6}
                        label="Descrição da Postagem" 
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={({ target }) => {
                            setSelectPost({ ...post, description: target.value })
                        }}
                    />
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose();
                    }} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        serviceEditPost(post).then((response) => {
                            if(response){
                                handleClose();
                                setUpdateList(!updateList)
                            }
                        });
                    }} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
}