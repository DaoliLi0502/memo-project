import { useEffect, useState } from "react"

function MemoList({ newMemo }) {
    const [memos, setMemos] = useState([])

    async function handleDelete(id) {
        const response = await fetch(`http://localhost:3000/memos/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        console.log(response.status)

        if (response.ok) {
            setMemos((memos) => {
                return memos.filter((memo) => {return memo.id !== id})
            })
        }
    }

    async function handleComplete(id, completed) {
        const response = await fetch(`http://localhost:3000/memos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                completed: !completed
            })
        })
        
        const data = await response.json()

        console.log(response.status)
        console.log(data)

        if (response.ok) {
            setMemos((memos) => {
                return memos.map((memo) => {
                    if (memo.id === id) {
                        return data.memo
                    }

                    return memo
                })
            })
        }
    }

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
                        <button onClick={() => handleComplete(memo.id, memo.completed)}>{memo.completed ? 'Uncomplete' : 'Complete'}</button>
                        <button>Edit</button>
                        <button onClick={() => handleDelete(memo.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MemoList