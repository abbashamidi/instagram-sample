import React, { useEffect, useState } from "react";

function DashboardPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // اینجا می‌تونی داده از API واقعی بگیری
    fetch("https://picsum.photos/v2/list?page=1&limit=6")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-1 mt-4 px-1">
      {posts.map((p) => (
        <div key={p.id} className="w-full aspect-square overflow-hidden">
          <img
            src={p.download_url}
            alt={p.author}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}

export default DashboardPosts;
