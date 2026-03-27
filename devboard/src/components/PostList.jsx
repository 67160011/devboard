import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import { useFavorites } from "../context/FavoritesContext"; 
import PostCount from "./PostCount.jsx"; 

function PostList() { 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const { favorites } = useFavorites(); 

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
    useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: "red" }}>เกิดข้อผิดพลาด: {error}</div>;

  return (

    <div style={{ padding: "1rem" }}> 
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ color: "#2d3748", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem", margin: 0 }}>
          โพสต์ล่าสุด
        </h2>

        <button 
        //task#3 1 ดาว
          onClick={fetchPosts} 
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ebf8ff",
            color: "#3182ce",
            border: "1px solid #90cdf4",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          {loading ? "กำลังโหลด..." : "🔄 โหลดใหม่"}
        </button>
      </div>

      <PostCount count={filtered.length} />

      <input 
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          marginBottom: "1rem",
          boxSizing: "border-box"
        }}
      />
      
      {filtered.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#718096", marginTop: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}
    </div> 
  );
}

export default PostList;