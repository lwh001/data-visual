import React, { PureComponent, Fragment } from 'react';
import TableComponent from "./components/Table";
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Home from "./pages/Home";

class App extends PureComponent {
  render() {
    return (
      
          <Router>
            <Fragment >
              <Route path="/" component={Home} exact></Route>
              <Route path="/addData" component={TableComponent}></Route>
              </Fragment>
          </Router>
      
    );
  }
}

export default App;
