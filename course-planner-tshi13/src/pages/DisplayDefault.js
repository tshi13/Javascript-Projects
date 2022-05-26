import { Component } from "react";
import Block from "../components/Block";
import Header from "../components/Header";
import PropTypes from "prop-types";

import { withRouter } from "react-router";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";


const styles = {
  fab: {
    position: "fixed",
    bottom: "3rem",
    right: "3rem",
  }
};


class DisplayDefault extends Component {
  

  getBlockClasses(status) { //get the classes in props.courses that have the correct status
    return(this.props.courses.filter(
      function(course){
        return course.status === status;
      }
    ));
  }

  updatePlannerPage = (classes) => { //refresh plannerCourses
    this.props.updatePlannerCourses(classes);
  }


  render() {
   
    return (
      <>
      <Header />
        <Block 
        blockName = {"Currently Enrolled"}
        coursesInBlock = {this.getBlockClasses("enrolled")} //pass courses in the block
        plannerCourses = {this.props.courses} //pass local array
        updatePlannerPage = {this.updatePlannerPage} //pass updating function as props
        />
        <Block 
        blockName = {"Want to Take"}
        coursesInBlock = {this.getBlockClasses("interested")} //pass courses in the block
        plannerCourses = {this.props.courses}//pass local array
        updatePlannerPage = {this.updatePlannerPage} //pass updating function as props
        />
        <Block 
        blockName = {"Already Took"}
        coursesInBlock = {this.getBlockClasses("taken")} //pass courses in the block
        plannerCourses = {this.props.courses}//pass local array
        updatePlannerPage = {this.updatePlannerPage} //pass updating function as props
        />
        <Link to="/search">
          <Fab style={styles.fab} color="primary">
            <Add />
          </Fab>
        </Link>
      </>      
    );
  }


}

export default withRouter(DisplayDefault);

DisplayDefault.propTypes = {
  courses: PropTypes.array.isRequired,
  updatePlannerCourses: PropTypes.func.isRequired
};
