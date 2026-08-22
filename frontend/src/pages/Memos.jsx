import { useState } from "react"
import { Link } from "react-router-dom"
import MemoForm from '../components/MemoForm'
import MemoList from '../components/MemoList'

function Memos() {
    const [newMemo, setNewMemo] = useState(null)

    return (
        <div>
            <h1>Memo App</h1>
            <Link to='/logout'>Logout</Link>
            <MemoForm onMemoCreated={setNewMemo} />
            <MemoList newMemo={newMemo} />
        </div>
    )
}

export default Memos