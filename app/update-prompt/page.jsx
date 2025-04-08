"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter,useSearchParams} from "next/navigation";

import Form from "@components/Form";

const Editprompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams=useSearchParams();
  const promptId=searchParams.get('id');

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });


  useEffect(()=>{
   const getPromptDetail=async()=>{
    const response=await fetch(`/api/prompt/${promptId}`);
    const data=await response.json();

    setPost({
        prompt:data.prompt,
        tag:data.tag,
    })
   }

   if(promptId) getPromptDetail();
  },[promptId])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (!session?.user) {
    return <p>You need to be signed in to create a prompt.</p>;
  }

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default Editprompt;
