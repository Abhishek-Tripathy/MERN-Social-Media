import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";

function Home() {
  const { posts, loading } = PostData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <AddPost type={"post"} />
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard type="post" value={post} key={post._id} />
            ))
          ) : (
            <p>No Posts Yet</p>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
