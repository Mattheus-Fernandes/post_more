import styles from './NewPost.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import {useAuthValue} from "../../context/useAuthContext"
import {useInsertDocument} from "../../hooks/useInsertDocument"


const NewPost = () => {

  const [title, setTitle] = useState("") 
  const [image, setImage] = useState()
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const {insertDocument, response} = useInsertDocument("posts")
  const {user} = useAuthValue()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()
    setFormError("")

    if(formError) {
      return
    }

    if(!title || image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos")
    }

    try {
      new URL(image)
      
      const tagsArray = tags.split(",").map((tag) => tag.trim().toLocaleLowerCase())

      insertDocument({
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName
      })

      
      navigate("/dashboard")

    }catch(eror) {
      setFormError("A imagem precisar ser uma URL ou LINK")
    }

  }

  return (
    <div className={styles.newPost}>
        <h1>Criar post</h1>
        <p>Escreva sobre o que quiser compartilhar o seu conhecimento</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input type="text" required placeholder='Escreve o título do seu post, capriche =)' value={title} onChange={(e) => setTitle(e.target.value)}/>
          </label>
          <label>
            <span>URL da imagem:</span>
            <input type="text" required placeholder='Insira a URL da sua imagem'onChange={(e) => setImage(e.target.value)}/>
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea name="body" required placeholder='Insira o contúdo do post'onChange={(e) => setBody(e.target.value)}></textarea>
          </label>
          <label>
            <span>Tags</span>
            <input type="text" name='tags' required placeholder='Insira as tags separadas por vírgula' onChange={(e) => setTags(e.target.value)}/>
          </label> 
          {!response.loading && <button>Postar</button>}
          {response.error && <p>{response.error}</p>}
          {formError && <p className='messageError'>{formError}</p>}
        </form>
    </div>
  )
}

export default NewPost