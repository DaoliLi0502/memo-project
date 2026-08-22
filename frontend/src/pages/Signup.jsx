import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')

        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password
            })
        })

        const data = await response.json()

        console.log(response.status)
        console.log(data)

        if (response.ok) {
            navigate('/login')
        } else {
            setError(data.error)
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

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
                Sign Up
            </button>

            {error && <p className="error">{error}</p>}

            <Link to='/login'>
                Login
            </Link>
            
        </form>
    )
}

export default Signup