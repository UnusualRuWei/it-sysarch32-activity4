function Header({ isLoggedIn, onLogout }) { // Receive isLoggedIn and onLogout props

    return (
      <header className="">
        <div className="topNavBar">
          <h1>HomePage</h1>
          {isLoggedIn ? ( // Conditionally render logout button
            <button onClick={onLogout}>Logout</button>
          ) : (
            <>
              <a href="/signup">Sign-Up</a>
              <a href="/login">Sign-In</a>
            </>
          )}
          <a href="/products">ProductList</a>
          <a>ProductDetails</a>
        </div>
      </header>
    );
  }
  
  export default Header;
  