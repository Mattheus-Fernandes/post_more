import syles from "./PostDetails.module.scss"
import { Link } from "react-router-dom"

const PostDetails = ({post}) => {
  return (
    <div className={syles.postDetails}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.createdBy}</p>
      <div>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`}>Ler</Link>
    </div>
  )
}

export default PostDetails

