import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate()

    async function handleLogout() {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'DELETE',
            credentials: 'include'
        })

        console.log(response.status)

        if (response.ok) {
            navigate('/login')
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout