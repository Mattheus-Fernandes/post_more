import styles from "./Register.module.scss"

import { useEffect, useState  } from "react"

import { useAuthentication } from "../../hooks/useAuthentication"


const Register = () => {

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")

    const user = {displayName, email, password}
    
    if(password !== confirmPassword) {
      setError("Ops, a sua senha precisa ser igual! Por favor tente novamente...")
    }

    const res = await createUser(user)
    console.log(res)
  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Se cadastre para postar</h1>
      <p>Crie o seu usuário para compartilhar as suas histórias</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" name="displayName" required placeholder="Nome do usuário" onChange={(e) => setDisplayName(e.target.value)}/>
        </label>
        <label>
          <span>Email:</span>
          <input type="text" name="email" required placeholder="Email do usuário" onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder="Insira a sua senha" onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <label>
          <span>Confirme a senha:</span>
          <input type="password" name="confirmPassword" required placeholder="Confirme a sua senha" onChange={(e) => setConfirmPassword(e.target.value)}/>
        </label>
      {!loading && <button>Cadastrar</button>}
      {loading && <button disabled>Aguarde...</button>}
      {error && <p className="messageError">{error}</p>}
      </form>
    </div>
  )
}

export default Register