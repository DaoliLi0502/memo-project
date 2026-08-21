function Logout({ onLogout }) {
    async function handleLogout() {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'DELETE',
            credentials: 'include'
        })

        console.log(response.status)

        if (response.ok) {
            onLogout()
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout