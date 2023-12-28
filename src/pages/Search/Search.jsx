import styles from "./Search.module.scss"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import PostDetails from '../../component/PostDetails/PostDetails'
import { Link } from 'react-router-dom'

const Search = () => {

  const query = useQuery()
  const search = query.get("q")

  const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div className={styles.search}>
      <h1>Resultado(s)</h1>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua pesquisa</p>
            <Link to="/">Voltar</Link>
          </>
        )}
        {posts && posts.map((post) => (
          <PostDetails key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Search