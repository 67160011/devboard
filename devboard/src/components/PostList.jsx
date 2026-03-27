import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
// 1. นำเข้า useFavorites จาก Context
import { useFavorites } from "../context/FavoritesContext"; 

function PostList() { // 2. ลบ { favorites, onToggleFavorite } ออกจากวงเล็บ
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // 3. เรียกใช้งาน Context ตรงนี้
  const { favorites } = useFavorites(); 

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setPosts(data.slice(0, 20));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: "red" }}>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div>
      {/* ... โค้ดส่วนหัวและ Input เหมือนเดิม ... */}
      
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          // 4. ไม่ต้องส่ง isFavorite หรือ onToggleFavorite แล้ว 
          // เพราะเราแก้ให้ PostCard ไปดึงข้อมูลเองจาก Context แล้วครับ
        />
      ))}
    </div>
  );
}

export default PostList;