"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Posts from "./components/Post";
import { PostType } from "./types/Post";

// Fetch all posts
const AllPost = async () => {
    const response = await axios.get("/api/posts/getPosts");
    return response.data;
};

export default function Home() {
    const { data, isLoading, error } = useQuery<PostType[]>({
        queryFn: AllPost,
        queryKey: ["posts"],
    });
    if (error) return error;
    if (isLoading) return "Loading...";

    return (
        <main>
            <AddPost />
            {data?.map((post: any) => (
                <Posts
                    key={post.id}
                    comments={post.Comment}
                    name={post.user.name}
                    avatar={post.user.image}
                    postTitle={post.title}
                    id={post.id}
                />
            ))}
        </main>
    );
}
