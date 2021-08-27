import api from './config'
import { toast } from 'react-toastify';
import { EditPost, NewPost, ResponsePosts } from './types/index';
import { Post } from '../types/index';

export async function serviceGetPosts(): Promise<Post[]> {
  const { data, status }: ResponsePosts = await api.get(`/posts`)
  if(status == 200){
    return data.reverse()
  }
  return []
}

export async function serviceNewPost({ title, description }: NewPost): Promise<boolean>{
  if(title && description){
      const { status } = await api.post('/posts', {  title: title, description: description })
      if(status == 201){
          toast.success("Postagem bem sucedida!");
          return true
      }
  }
  toast.warn("Preencha os campos!");
  return false
}

export async function serviceDeletePosts(id: number): Promise<boolean> {
  if (id) {
    const { status } = await api.delete(`/posts/${id}`)
    if (status === 200) {
      toast.success("Post deletado!");
      return true
    }
    toast.warn("Não foi possível deletar");
    return false
  }
  toast.warn("Não foi possível deletar");
  return false
}

export async function serviceEditPost({id, title, description }: EditPost): Promise<boolean> {
  if (id) {
    const { status } = await api.put(`/posts/${id}`, { title: title, description: description })
    if (status === 200) {
      toast.success("Post editado!");
      return true
    }
    toast.warn("Não foi possível editar");
    return false
  }
  toast.warn("Não foi possível editar");
  return false
}