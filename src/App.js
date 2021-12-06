import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import React, {useState} from "react";
import NavHead from "./Nav/NavHead";
import "/Users/hrithik/Desktop/webstorm/release-auto-grader/src/css/App.css"
import HomePage from "./login/HomePage";

function App() {
    const [id, updateId] = useState("");

    return (
        <Router>
            <div className="App">
                <NavHead/>
            </div>
            <Switch>
                <Route exact path="/">
                    <HomePage updateAppId={updateId}/>{" "}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
