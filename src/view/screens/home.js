import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Copyright, FormPost, DialogDelete, DialogEdit } from '../../components';
import { serviceGetPosts, serviceDeletePosts, serviceEditPost } from '../../services'
import { useHomeStyles } from '../styles';

export function Home() {
  const classes = useHomeStyles();

  const [posts, setPosts] = useState();
  const [updateList, setUpdateList] = useState(false);
  const [selectPost, setSelectPost] = useState({id: '', title: '', description: ''});

  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  

  useEffect(() => {// passo uma função/script para ser executado antes do render
    serviceGetPosts()
      .then(data => {
          // implementar setPost passando o valor data || setar no estado o valor da promessa
          setPosts(data);
      })      
  }, [updateList]) // o momento que eu quero que o useEffect seja executado

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
             Rede Social
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid xs={12} sm={12} md={12} spacing={4} style={{ marginBottom: '50px' }}>
            {/* colocar card */}
            <FormPost setUpdateList={setUpdateList} updateList={updateList} ></FormPost>
          </Grid>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {posts && posts.map((post) => (
              <>
                <Grid item key={post.id} xs={12} sm={12} md={12}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                      { post.title }
                      </Typography>
                      <Typography>
                        { post.description }
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small"
                        color="primary"
                        onClick={() => {
                          setSelectPost(post)
                          handleClickOpenDelete()
                        }}>
                        Deletar
                      </Button>
                      <Button  
                        size="small"
                        color="primary"
                        onClick={() => {
                          setSelectPost(post)
                          handleClickOpenEdit()
                        }}>
                        Editar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
        </Container>
        <DialogDelete open={openDelete} handleClose={handleCloseDelete} serviceDeletePosts={serviceDeletePosts} id={selectPost.id} setUpdateList={setUpdateList} updateList={updateList} />
        <DialogEdit open={openEdit} handleClose={handleCloseEdit} serviceEditPost={serviceEditPost} post={selectPost} setSelectPost={setSelectPost} setUpdateList={setUpdateList} updateList={updateList} />
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}