import "./Nav.scss";

function Nav() {
  const logOut = () => {
    localStorage.removeItem("apiKey");
  };

  return (
    <nav className="top-nav">
      <button onClick={logOut}>Log out</button>
    </nav>
  );
}

export default Nav;
