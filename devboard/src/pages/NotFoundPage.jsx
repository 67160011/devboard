import { Link } from "react-router-dom";
//task#4 1 ดาว 
function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1 style={{ fontSize: "3rem", color: "#ff0000" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#ff0000" }}>ไม่พบหน้าที่คุณต้องการ</p>
      <Link 
        to="/" 
        style={{ 
          color: "#3182ce", 
          textDecoration: "underline",
          marginTop: "1rem",
          display: "inline-block" 
        }}
      >
        [← กลับหน้าหลัก]
      </Link>
    </div>
  );
}

export default NotFoundPage;