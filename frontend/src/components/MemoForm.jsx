import { useState } from "react"

function MemoForm() {
    const [content, setContent] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await fetch('http://localhost:3000/memos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                content
            })
        })

        const data = await response.json()

        console.log(response.status)
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New memo"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Add Memo</button>
        </form>
    )
}

export default MemoForm