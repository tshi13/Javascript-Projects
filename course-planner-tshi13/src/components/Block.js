import { Component } from "react";
import Course from "./Course";

import PropTypes from "prop-types";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";



class Block extends Component {

  updatePlannerBlock = (classes) => { //function to update local array
    this.props.updatePlannerPage(classes);
  }


  render() {
    return (
      <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box py={2}>
          <Typography variant="h6">{this.props.blockName}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
          
        {this.props.coursesInBlock.map((course, index) => { //dynamically insert courses in each block
          return <Course
          category = {course.status}
          courseNumber = {course.number}
          courseName = {course.title}
          courseTerm = {course.term}
          key = {index}
          updatePlannerBlock = {this.updatePlannerBlock} //pass update block function as props
          courseObject = {course} //pass the actual course object for API call usage later
          allCourses = {this.props.plannerCourses} //all planner courses 
          view = "block"
          />
          
        })}
        </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}


export default Block;

Block.propTypes = {
  blockName: PropTypes.string.isRequired,
  coursesInBlock: PropTypes.array.isRequired,
  plannerCourses: PropTypes.array.isRequired,
  updatePlannerPage: PropTypes.func.isRequired
}