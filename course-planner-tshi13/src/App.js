import Container from "@material-ui/core/Container";
import { Component } from "react";
import DisplayDefault from "./pages/DisplayDefault";
import DisplaySearch from "./pages/DisplaySearch";
import {Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import * as Api from "./services/api"



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plannerCourses : [], //all courses that should show up in our planner page
      query: "", //query to show on search bar
      searchResults: [], //courses to show on search page
      totalPage: 1, //total number of pages to show on search page
      currentPage: 1 //current page on search page
    };
  }

  componentDidMount = () => { //getAll classes in our planner page, setState
    const classes = Api.getAll(); 
    classes.then(classes => {
      this.setState({
        plannerCourses: classes,
      });
    })
  };

  updatePlannerCourses = (classes) => { //refresh all courses in plannerCourses
    this.setState({
      plannerCourses: classes
    });
  }

  updateSearchQueryAndResults = (query,classes) => { //refresh query and searchResults in state using function
    this.setState({
      query: query,
      searchResults: classes
    });
  }

  updateCurrentPageNum = (currentPage) => { //refresh currentPage in state using function
    this.setState({
      currentPage: currentPage
    })
  }

  updateTotalPageNum = (totalPage) => { //refresh totalPage in state using function
    this.setState({
      totalPage: totalPage
    })
  }


  render() {
    const {plannerCourses} = this.state;
    return (
      <Container>
        <Switch>
          <Route exact path="/">
            <DisplayDefault
              courses = {plannerCourses} //pass plannerCourses down as props
              updatePlannerCourses = {this.updatePlannerCourses} //pass updating function as props
            />
          </Route>
          <Route path="/search">
            <DisplaySearch
            courses = {plannerCourses} //pass plannerCourses down as props
            updatePlannerCourses = {this.updatePlannerCourses} //passing updating function as props
            query = {this.state.query} //passing query
            searchResults = {this.state.searchResults} //passing search results array
            updateSearchQueryAndResults = {this.updateSearchQueryAndResults} //update query and results with function
            updateCurrentPageNum = {this.updateCurrentPageNum} //passing update current page num function as props
            updateTotalPageNum = {this.updateTotalPageNum} // passing update total page num function as props
            pageTotal = {this.state.totalPage} // passing pageTotal as props
            currentPage = {this.state.currentPage} //passing currentPage as props
            />
          </Route>
          <Route>
            <div>404 - Not Found!</div>
            <Link to = "/">
              "Back to home page"
            </Link>
          </Route>
        </Switch>
      </Container>
    );
  }
}


export default App;
