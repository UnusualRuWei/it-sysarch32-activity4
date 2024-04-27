
function Header(){
    return (
        <header className="">
            <div className="topNavBar">
                <h1>HomePage</h1>
                <a href="/signup">Sign-Up</a>
                <a href="/login">Sign-In</a>
                <a href="/products"> ProductList</a>
                <a href="/orders">OrderList</a>
            </div>  
        </header>
    );
    
}

export default Header