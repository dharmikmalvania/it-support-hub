export const baseTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  body {
    margin:0;
    padding:0;
    background:#f2f4f8;
    font-family: 'Segoe UI', Arial, sans-serif;
  }
  .container {
    max-width:600px;
    margin:40px auto;
    background:#ffffff;
    border-radius:14px;
    box-shadow:0 20px 50px rgba(0,0,0,0.08);
    overflow:hidden;
  }
  .header {
    background:linear-gradient(135deg,#4f46e5,#6366f1);
    padding:25px;
    text-align:center;
    color:white;
    font-size:20px;
    font-weight:600;
  }
  .content {
    padding:30px;
    color:#333;
    font-size:15px;
    line-height:1.7;
  }
  .badge {
    display:inline-block;
    background:#e0e7ff;
    color:#4f46e5;
    padding:6px 12px;
    border-radius:20px;
    font-size:12px;
    font-weight:600;
  }
 .btn {
  display:inline-block;
  margin-top:25px;
  padding:14px 28px;
  background:#4f46e5;
  color:white !important;
  text-decoration:none;
  border-radius:50px;
  font-weight:600;
  font-size:14px;
}

  .footer {
    text-align:center;
    padding:20px;
    font-size:12px;
    color:#888;
    background:#fafafa;
  }
</style>
</head>
<body>

  <div class="container">
    <div class="header">
      ${title}
    </div>

    <div class="content">
      ${content}
      <br/>
      <a href="http://localhost:5173/login" class="btn">
        Open Dashboard
      </a>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} IT Support Hub <br/>
      Professional IT Support Management System
    </div>
  </div>

</body>
</html>
`;
