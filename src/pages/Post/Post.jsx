import styles from "./Post.module.scss"

import { useParams } from "react-router-dom"

import { useFetchOnlyDocument } from "../../hooks/useFecthOnlyDocument"

const Post = () => {

  const {id} = useParams()
  const {document: post, loading} = useFetchOnlyDocument("posts", id)

  return (
    <div className={styles.post_container}>
      {loading && (
        <p>Carregado post...</p>
      )}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <span>Este post trata sobre:</span>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post