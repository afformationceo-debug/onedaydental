import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="zh-Hant-TW">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#f1eff7" }}>
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "48px", fontWeight: 800, color: "#1b1a22", margin: 0 }}>404</p>
          <p style={{ color: "#714fa6" }}>找不到頁面 · 페이지를 찾을 수 없습니다</p>
          <Link
            href="/zh-TW"
            style={{
              marginTop: "8px",
              padding: "12px 24px",
              borderRadius: "9999px",
              background: "#714fa6",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            韓國oneday牙科 首頁
          </Link>
        </div>
      </body>
    </html>
  );
}
