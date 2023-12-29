import styles from "./Dashboard.module.scss"
import { Link } from "react-router-dom"
import {useAuthValue} from "../../context/useAuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import {useDeleteDocument} from "../../hooks/useDelete"

const Dashboard = () => {

  const {user} = useAuthValue()
  const uid = user.uid
  
  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)

  const {deleteDocument} = useDeleteDocument("posts")

  
  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencimento de posts</p>

      {posts && posts.length === 0 ? (
        <div className={styles.notFound}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create">Criar primeiro post</Link>
        </div>
      ): (
        <div className={styles.square}>
          <div className={styles.info}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts && posts.map((post) => (
            <div className={styles.action} key={post.id}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`}>Ver</Link>
                <Link to={`/posts/edit/${post.id}`}>Editar</Link>
                <button onClick={() => deleteDocument(post.id)} className={styles.delete} >Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>

  )
}

export default Dashboard