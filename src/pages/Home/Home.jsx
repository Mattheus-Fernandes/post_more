import styles from "./Home.module.scss"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import PostDetails from "../../component/PostDetails/PostDetails"

const Home = () => {

  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    
    if(query) {
      return navigate(`/search?q=${query}`)
    }

  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleClick}>
        <input type="text" placeholder="Ou busque por tags..." value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button>Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetails key={post.id} post={post} />
        ))}  
        {posts && posts.length === 0 && (
          <div>
            <p>OPS!! Não foram encontrados posts</p>
            <Link to="/posts/create">Criar primeiro post</Link>
          </div>
        )}
      </div>  
    </div>
  )
}

export default Home