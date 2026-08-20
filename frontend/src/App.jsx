import Login from './pages/Login'
import MemoForm from './components/MemoForm'
import MemoList from './components/MemoList'
import { useState } from 'react'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [newMemo, setNewMemo] = useState(null)

    return (
        <>
            {!isLoggedIn && <Login onLogin={() => setIsLoggedIn(true)} />}

            {isLoggedIn && (
                <>
                    <MemoForm onMemoCreated={setNewMemo} />
                    <MemoList newMemo={newMemo} />
                </>
            )}
        </>
    )
}

export default App