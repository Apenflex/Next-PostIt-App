'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [toastPostID, setToastPostID] = useState<string | undefined>();
    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        async (title: string) => await axios.post("/api/posts/addPost", { title }),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: toastPostID });
                }
                setIsDisabled(false);
            },
            onSuccess: (data) => {
                toast.success("Post created successfully", { id: toastPostID });
                queryClient.invalidateQueries(["posts"]);
                setTitle("");
                setIsDisabled(false);
            },
        }
    );

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setToastPostID(toast.loading("Creating a post..."));
        setIsDisabled(true);
        mutate(title);
        setIsDisabled(false);
    };

    return (
        <form className="bg-white my-8 p-8 rounded-md" onSubmit={submitPost}>
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
                <p
                    className={`font-bold text-sm ${
                        title.length > 300 ? "text-red-700" : "text-gray-700"
                    }`}
                >
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