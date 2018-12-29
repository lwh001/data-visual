import React, { PureComponent, Fragment } from 'react';
import TableComponent from "./components/Table";
import { BrowserRouter as Router, Route  } from 'react-router-dom'

class App extends PureComponent {
  render() {
    return (
      <Fragment >
          <Router>
              <Route path="/" component={TableComponent}></Route>
          </Router>
      </Fragment>
    );
  }
}

export default App;
