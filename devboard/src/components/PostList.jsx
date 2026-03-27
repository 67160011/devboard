import { useState } from "react";
import PostCard from "./PostCard";

function PostList({ posts, favorites, onToggleFavorite }) {
  // 1. สร้าง State สำหรับเก็บค่าที่พิมพ์ในช่องค้นหา
  const [search, setSearch] = useState("");

  // 2. Logic การกรองโพสต์: กรองเฉพาะโพสต์ที่ชื่อ (title) ตรงกับคำค้นหา
  // ใช้ .toLowerCase() เพื่อให้ค้นหาได้โดยไม่เกี่ยงตัวพิมพ์เล็ก-ใหญ่
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* 3. ส่วน Input สำหรับค้นหา */}
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
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* 4. แสดงข้อความเมื่อค้นหาไม่พบ (Conditional Rendering) */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* 5. Loop แสดงรายการโพสต์ที่ผ่านการกรองแล้ว */}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          // ส่งสถานะว่าเป็น Favorite หรือไม่ โดยเช็คจาก Array favorites
          isFavorite={favorites.includes(post.id)}
          // ส่ง Function กลับไปที่ App.jsx เมื่อมีการกดปุ่ม Favorite
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;