import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { toast } from "react-hot-toast";

const DashboardPosts = forwardRef((props, ref) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/posts", {
        // تغییر آدرس API
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      toast.error("❌ Error fetching posts: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshPosts: () => {
      setLoading(true);
      fetchPosts();
    },
    clearPosts: () => {
      setPosts([]);
    },
  }));

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-4">Loading posts...</div>;
  if (posts.length === 0)
    return <div className="text-white text-center mt-4">No posts yet.</div>;

  return (
    <div className="grid grid-cols-3 gap-1 mt-4 px-1">
      {posts.map((p, i) => (
        <div key={i} className="w-full aspect-square overflow-hidden">
          <img
            src={`http://localhost:3000${p.image}`}
            alt={p.username}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      {/* Spacer برای جلوگیری از پوشش Footer روی پست‌ها */}
      <div className="col-span-3 h-12" />
    </div>
  );
});

export default DashboardPosts;
