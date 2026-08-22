import { useState } from "react"

function MemoForm({ onMemoCreated }) {
    const [content, setContent] = useState("")
    const [dueAt, setDueAt] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        const due_at = dueAt ? dueAt.replace('T', ' ') + ':00' : null

        const response = await fetch('http://localhost:3000/memos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                content,
                due_at
            })
        })

        const data = await response.json()

        console.log(response.status)
        console.log(data)

        if (response.ok) {
            onMemoCreated(data.memo)
        }
    }

    return (
        <form className="memo-form" onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                placeholder="New memo"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <input
                type="datetime-local"
                value={dueAt}
                onChange={(e) => setDueAt(e.target.value)}
            />
            <button type="submit">Add Memo</button>
        </form>
    )
}

export default MemoForm