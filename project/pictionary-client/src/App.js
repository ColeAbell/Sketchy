import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Home from './components/Home';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Login from './components/Login';
import AuthContext from './AuthContext';
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import QuestionList from "./components/QuestionList";
import QuestionForm from "./components/QuestionForm";

const LOCAL_STORAGE_TOKEN_KEY = "pictionaryToken";

function App() {

  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    const { sub: username, authorities } = jwt_decode(token);

    const roles = authorities.split(',');

    // create our user object
    const userToLogin = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };

    console.log(userToLogin);

    // update the global user state variable
    setUser(userToLogin);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user,
    login,
    logout
  };

  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (

    <AuthContext.Provider value={auth}>

    <Router>
      
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/categories" exact>
          <CategoryList />
        </Route>
        <Route path={["/categories/add","/categories/edit/:id"]}>
          <CategoryForm />
        </Route>
        <Route path="/questions" exact>
          <QuestionList />
        </Route>
        <Route path={["/questions/add","/questions/edit/:id"]}>
          <QuestionForm />
        </Route>
        <Route path="/login">
            <Login />
          </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>

    </Router>

    </AuthContext.Provider>
  );
}

export default App;
