import { useEffect, useState } from "react"

function MemoList({ newMemo }) {
    const [memos, setMemos] = useState([])

    useEffect(() => {
        async function getMemos() {
            const response = await fetch('http://localhost:3000/memos', {
                credentials: 'include'
            })

            const data = await response.json()

            setMemos(data.memos)
        }

        getMemos()
    }, [])

    useEffect(() => {
        if (newMemo) {
            setMemos((memos) => {
                return [...memos, newMemo]
            })
        }
    }, [newMemo])

    return (
        <div>
            <h2>Memos</h2>

            {memos.map((memo) => {
                return (
                    <div key={memo.id}>
                        <p>Content: {memo.content}</p>
                        <p>Created: {memo.created_at}</p>
                        <p>Due: {memo.due_at}</p>
                        <p>Status: {memo.completed ? 'Completed' : 'Not completed'}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default MemoList