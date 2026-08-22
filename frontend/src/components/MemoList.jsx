import { useEffect, useState } from "react"

function MemoList({ newMemo }) {
    const [memos, setMemos] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editContent, setEditContent] = useState('')
    const [editDueAt, setEditDueAt] = useState('')

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

    async function handleEdit(id) {
        const due_at = editDueAt ? editDueAt.replace('T', ' ') + ':00' : null

        const response = await fetch(`http://localhost:3000/memos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                content: editContent,
                due_at: due_at
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
                        {editingId === memo.id && (
                            <div>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit(memo.id)
                                }}>
                                    <input
                                        type="text"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />

                                    <input
                                        type="datetime-local"
                                        value={editDueAt}
                                        onChange={(e) => setEditDueAt(e.target.value)}
                                    />

                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                                </form>
                            </div>
                        )}

                        {editingId !== memo.id && (
                            <div>
                                <p>Content: {memo.content}</p>
                                <p>Created: {memo.created}</p>
                                <p>Due: {memo.due_at}</p>
                            </div>
                        )}
                        <p>Status: {memo.completed ? 'Completed' : 'Not completed'}</p>
                        <button onClick={() => handleComplete(memo.id, memo.completed)}>{memo.completed ? 'Uncomplete' : 'Complete'}</button>
                        <button onClick={() => {
                            setEditingId(memo.id)
                            setEditContent(memo.content)
                            setEditDueAt(memo.due_at ? memo.due_at.replace(' ', 'T').slice(0, 16) : '')
                        }}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(memo.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MemoList