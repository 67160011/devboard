function PostCount({ count }) {
  return (
    <div style={{
      backgroundColor: "#edf2f7",
      padding: "0.75rem 1rem",
      borderRadius: "6px",
      marginBottom: "1rem",
      color: "#ff0000",
      fontSize: "0.9rem",
      fontWeight: "bold"
    }}>
      โพสต์ทั้งหมด: {count} รายการ
    </div>
  );
}

export default PostCount;