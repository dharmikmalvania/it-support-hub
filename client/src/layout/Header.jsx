const Header = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="header">
      <h3>Welcome, {user?.name}</h3>
    </div>
  );
};

export default Header;
