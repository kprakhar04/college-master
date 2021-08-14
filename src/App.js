import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";
import Course from "./pages/Course";
import State from "./pages/State";
import CollegeInfo from "./pages/CollegeInfo";
import StudentInfo from "./pages/StudentInfo";
import ScrollToTop from "./components/ScrollToTop";
import StateGraph from "./components/StateGraph";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div className="page">
              <Home />
            </div>
          )}
        />
        <Route
          exact
          path="/course/:course"
          render={() => (
            <div className="page">
              <Course />
            </div>
          )}
        />
        <Route
          exact
          path="/state/:state"
          render={() => (
            <div className="page">
              <State />
            </div>
          )}
        />
        <Route
          exact
          path="/college/:id"
          render={() => (
            <div className="page">
              <CollegeInfo />
            </div>
          )}
        />
        <Route
          exact
          path="/student/:id"
          render={() => (
            <div className="page">
              <StudentInfo />
            </div>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
