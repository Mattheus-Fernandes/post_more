//CSS
import { Link } from "react-router-dom"
import styles from "./About.module.scss"

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Sobre o Mini <span>Blog</span></h1>
      <p>Este projeto consiste em um blog feito com React no front-end e Firesbase no back end</p>
      <Link to="/posts/create" className="btn">Criar post</Link>
    </div>
  )
}

export default About