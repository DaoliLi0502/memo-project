import { useState } from "react"
import { Link } from "react-router-dom"
import MemoForm from '../components/MemoForm'
import MemoList from '../components/MemoList'

function Memos() {
    const [newMemo, setNewMemo] = useState(null)

    return (
        <div className="memos-page">
            <h1>Memo App</h1>
            <Link to='/logout'>Logout</Link>
            <h2>New Memo</h2>
            <MemoForm onMemoCreated={setNewMemo} />
            <MemoList newMemo={newMemo} />
        </div>
    )
}

export default Memos