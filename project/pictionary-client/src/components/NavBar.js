import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../AuthContext";

function NavBar() {
    const auth = useContext(AuthContext);

    return (

    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
          {!auth.user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
        {auth.user && (
          <div>
            Welcome {auth.user.username}!
            <button onClick={() => auth.logout()}>Logout</button>
          </div>
        )}
      </nav>
      <h1 className="my-4">Pictionary App</h1>
    </>
    );
}

export default NavBar;