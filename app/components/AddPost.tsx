'use client'
import { useState } from "react"

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    return (
        <form className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                    name="title"
                    value={title}
                    placeholder="What's on your mind?"
                    onChange={(e) => setTitle(e.target.value)}
                ></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>
                    {`${title.length}/300`}
                </p>
                <button
                    className="bg-teal-600 text-white text-sm px-6 py-2 rounded-xl disabled:opacity-25"
                    disabled={isDisabled}
                    type="submit"
                >
                    Create a post
                </button>
            </div>
        </form>
    );
}