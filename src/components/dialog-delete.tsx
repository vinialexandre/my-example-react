import React, { forwardRef } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition: any = forwardRef(function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


type InputProps = {
    open: boolean;
    handleClose: () => void;
    serviceDeletePosts: (id: number) => Promise<boolean>;
    id: number;
    setUpdateList: React.Dispatch<React.SetStateAction<boolean>>,
    updateList: boolean;
}

export function DialogDelete({ open, handleClose, serviceDeletePosts, id, setUpdateList, updateList }: InputProps): JSX.Element {
    return  <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Confirmar</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Você deseja deletar esse registro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        serviceDeletePosts(id).then((response: any) => {
                            if(response){
                                handleClose();
                                setUpdateList(!updateList)
                            }
                        });
                    }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
}