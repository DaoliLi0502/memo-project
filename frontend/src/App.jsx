import Login from './pages/Login'
import Logout from './pages/Logout'
import MemoForm from './components/MemoForm'
import MemoList from './components/MemoList'
import Signup from './pages/Signup'
import { useState } from 'react'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [newMemo, setNewMemo] = useState(null)

    return (
        <>
            <Signup />

            {!isLoggedIn && <Login onLogin={() => setIsLoggedIn(true)} />}

            {isLoggedIn && (
                <>
                    <Logout onLogout={() => setIsLoggedIn(false)} />
                    <MemoForm onMemoCreated={setNewMemo} />
                    <MemoList newMemo={newMemo} />
                </>
            )}
        </>
    )
}

export default App