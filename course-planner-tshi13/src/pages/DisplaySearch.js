import { Component } from "react";
import Pagination from '@mui/material/Pagination';
import Search from "../components/Search";
import Grid from "@material-ui/core/Grid";
import * as Api from "../services/api";
import Course from "../components/Course";
import { withRouter } from "react-router";
import PropTypes from "prop-types";



const styles = {
  page: {
    alignitems: "center",
    justifyContent: 'center',
    display: "flex"
  }
};


class DisplaySearch extends Component {

  updateQuery = (q) => { //update query when user enters new search
    if (q==="") { //when there is nothing in search bar
    this.props.updateCurrentPageNum(1);
    this.props.updateTotalPageNum(1);
    this.props.updateSearchQueryAndResults("",[]);
    } else { //when we search for result
      const results = Api.search(q, this.props.currentPage, 9); //api call
      results.then(data => {
        this.props.updateTotalPageNum(data.pagination.last); //update total page number 
        this.props.updateSearchQueryAndResults(q,data.data); //update search results and query
      });
    }    
  }

  updatePageNum = (event, num) => { //when user clicks on new page num, update all corresponding props
    this.props.updateCurrentPageNum(num);
    const results = Api.search(this.props.query, num, 9);
    results.then(data => {
      this.props.updateTotalPageNum(data.pagination.last);
      this.props.updateSearchQueryAndResults(this.props.query,data.data);
    });
  }

  updatePlannerSearch = (classes) => { //update local array of classes
    this.props.updatePlannerCourses(classes);
  }

  initiateStatus = (courseObj) => { //get status for course objects without status field
    const arr = this.props.courses;
    for (let i=0; i<arr.length; i++) {
      if (courseObj.number === arr[i].number && courseObj.term ===arr[i].term) {
        return arr[i].status;
      }
    }
    return "none";
  }

  setColor = (category) => { //get correct color for courses
    if (category === "enrolled") return "info.main";
    else if (category === "interested") return "warning.main";
    else if (category === "taken") return "success.main";
    else return "text.disabled";
  }

  render() {
    return (
      <>
      <Search 
      updateQuery = {this.updateQuery} //pass updateQuery to send info back
      query = {this.props.query} //pass in query to show in searchbar
      />
      <Pagination count={this.props.pageTotal} style = {styles.page} page = {this.props.currentPage} onChange = {this.updatePageNum} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
        
        {this.props.searchResults.map((course,index) => { //iterate through all courses that should be shown on current search page
          return <Course
          category = {this.initiateStatus(course)}
          color = {this.setColor(this.initiateStatus(course))}
          courseNumber = {course.number}
          courseName = {course.title}
          courseTerm = {course.term}
          key = {index}
          updatePlannerBlock = {this.updatePlannerSearch}
          courseObject = {course} 
          allCourses = {this.props.courses} //all planner courses, has status and id!
          view = "search"
          />
        })}
        </Grid> 
      </>    
    );
  }
}

export default withRouter(DisplaySearch);

DisplaySearch.propTypes = {
  courses: PropTypes.array.isRequired,
  updatePlannerCourses: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  updateSearchQueryAndResults: PropTypes.func.isRequired,
  updateCurrentPageNum: PropTypes.func.isRequired,
  updateTotalPageNum: PropTypes.func.isRequired,
  pageTotal: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};