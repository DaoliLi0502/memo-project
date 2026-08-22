import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')

        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                name,
                password
            })
        })

        const data = await response.json()

        console.log(response.status)
        console.log(data)

        if (response.ok) {
            navigate('/memos')
        } else {
            setError(data.error)
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

                {error && <p className="error">{error}</p>}

                <Link to='/signup'>
                    Sign up
                </Link>
            </form>
        </div>
    )
}

export default Login