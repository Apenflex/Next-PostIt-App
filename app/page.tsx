"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Posts from "./components/Posts";

// Fetch all posts
const AllPost = async () => {
   const response = await axios.get('/api/posts/getPosts')
   return response.data
}

export default function Home() {
   const { data, isLoading, error } = useQuery(
      {
         queryFn: AllPost,
         queryKey: ["posts"],
      })
   if (error) return error
   if (isLoading) return "Loading..."
   console.log(data)
   return (
      <main>
         <AddPost />
         {data?.map((post: any) => (
            <Posts
               key={post.id}
               name={post.user.name}
               avatar={post.user.image}
               postTitle={post.title}
               id={post.id}
            />
         ))}
      </main>
   );
}
