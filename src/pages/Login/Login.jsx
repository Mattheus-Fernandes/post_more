import styles from "./Login.module.scss"
import { useState, useEffect } from "react"
import { useAuthentication } from "../../hooks/useAuthentication"


const Login = () => {

  const {login, loading, error:authError} = useAuthentication()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      email, password
    }

    const res = await login(user)
    console.log(user)
  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  })

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input type="text" name="email" required placeholder="Email de usuário" onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder="Insira a sua senha" onChange={(e) => setPassword(e.target.value)}/>
        </label>
        {!loading && <button>Entrar</button>}
        {loading && <button disabled>Aguarde...</button>}
        {error && <p className="messageError">{error}</p>}
      </form>
    </div>
  )
}

export default Login