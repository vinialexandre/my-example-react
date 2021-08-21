import React, { useState } from 'react';
import { serviceNewPost } from '../services'
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useHomeStyles } from '../view/styles';

export const FormPost = ({ setUpdateList, updateList }) => {
    const classes = useHomeStyles();
 
    const [newPost, setNewPost] = useState({title: '', description: ''});

    return <>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <TextField 
                        style={{ marginBottom: '10px' }}
                        fullWidth 
                        value={newPost.title}
                        label="Título da Postagem" 
                        onChange={({ target }) => {
                            setNewPost({...newPost, ...{title: target.value}})
                        }}
                    />
                    <TextField 
                        style={{ marginBottom: '10px' }}
                        fullWidth 
                        multiline  
                        value={newPost.description}
                        rows={6}
                        label="Descrição da Postagem" 
                        onChange={({ target }) => {
                            setNewPost({...newPost, ...{description: target.value}})
                        }}
                    />
                    <Button 
                        style={{ float: 'right'}} 
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            serviceNewPost(newPost).then(response => {
                                if(response){
                                    setNewPost({title: '', description: ''})
                                    setUpdateList(!updateList)
                                }
                            })
                        }}>
                        Postar
                    </Button>
                </CardContent>
            </Card>
        </>
}
