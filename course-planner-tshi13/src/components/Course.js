import { Component } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { create, remove, update } from "../services/api";
import PropTypes from "prop-types";



const styles = {
  fab: {
    position: "fixed",
    bottom: "3rem",
    right: "3rem",
  },
  card: {
    margin: "1rem",
    width: "16rem",
  },
  cardContent: {
    minHeight: "8rem",
  },
  cardActions: {
    height: "3rem",
  },
  iconButton: {
    marginLeft: "auto",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
  },
  expandMore: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    padding: "0.5rem",
  },
  select: {
    width: "100%",
    height: "100%",
    opacity: "0",
    cursor: "pointer",
  },
};

class Course extends Component {
  //props: category, courseNumber, courseName, courseTerm
  constructor(props) {
    super(props);
    this.color = this.setColor(this.props.category);

  }

  setColor = (category) => { //get correct color
    if (category === "enrolled") return "info.main";
    else if (category === "interested") return "warning.main";
    else if (category === "taken") return "success.main";
    else return "text.disabled";
  }

  setColorBasedOnView = (view) => { //decide which color method we should use, based on which view we are on
    if (view === "block") return this.color;
    else return this.props.color;
  }

  setEnrolled = () => { //set status of course to enrolled
    if(this.props.view === "block") {
      this.updateDefaultView("enrolled");
    } else {
      this.updateSearchView("enrolled");
    }
  }

  setInterested = () => { //set status of course to interested
    if(this.props.view === "block") {
      this.updateDefaultView("interested");
    } else {
      this.updateSearchView("interested");
    }
  }

  setTaken = () => { //set status of course to taken
    if(this.props.view === "block") {
      this.updateDefaultView("taken");
    } else {
      this.updateSearchView("taken");
    }
  }

  setNone = () => { //set status of course to none
    if(this.props.view === "block") {
      this.updateDefaultView("none");
    } else {
      this.updateSearchView("none");
    }
  }


  updateSearchView = (status) => { //when we are in search page updating status

    let found = false;
    let foundObject;
    for (let i=0; i< this.props.allCourses.length; i++) { //search for course in allCourses, update the corresponding course in allCourses
      if (this.props.allCourses[i].number === this.props.courseObject.number 
        && this.props.allCourses[i].term === this.props.courseObject.term) {
        found = true;
        foundObject = this.props.allCourses[i];
        if (status === "none") { //delete from array
          this.props.allCourses.splice(i,1);
        } else { //update status field
          this.props.allCourses[i].status = status;
        }
      }
    }

    if (found) { //when it is in allCourses, do API calls
      if (status === "none") {
        remove(foundObject);
      } else {
        update(foundObject,status);
      } 
    } else { //when it is not found in allCourses
      this.props.courseObject.status = status; //add status field to our courseObject
      let createdCourse = create(this.props.courseObject); //createdCourse now has _id field!
      createdCourse.then(obj => {
        this.props.courseObject._id = obj._id;
      }).catch(err => {
        console.log(err);
      })    
      
      this.props.allCourses.push(this.props.courseObject); //add course to local array
    }

    this.props.updatePlannerBlock(this.props.allCourses); //update status in local array
  }



  updateDefaultView = (status) => { //when we are in planner page
    for (let i=0; i< this.props.allCourses.length; i++) { //update the corresponding course in allCourses
      if (this.props.allCourses[i]._id === this.props.courseObject._id) {
        if (status === "none") { //remove from array
          this.props.allCourses.splice(i,1);
        } else {
          this.props.allCourses[i].status = status; //update status
        }
      }
    }
    this.props.updatePlannerBlock(this.props.allCourses); //update status in local array
    if (status === "none") { //corresponding API calls
      remove(this.props.courseObject);
    }
    else {
      update(this.props.courseObject,status);
    }
  }


  render() {
    const {courseNumber,courseName, courseTerm } = this.props;
    return (
      <AccordionDetails>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Card style={styles.card}>
              <Box bgcolor={this.setColorBasedOnView(this.props.view)}>
                <CardContent style={styles.cardContent}>
                  <Typography color="textSecondary" gutterBottom>
                    {courseNumber} 
                  </Typography>
                  <Typography variant="h5">{courseName}</Typography>
                </CardContent>
              </Box>
              <CardActions style={styles.cardActions}>
                <Button disabled>{courseTerm}</Button>
                <IconButton style={styles.iconButton}>
                  <ExpandMore style={styles.expandMore} />
                  <Select style={styles.select} value={this.props.category}>
                    <MenuItem value="move" disabled>
                      <Typography variant="body1">Move to...</Typography>
                    </MenuItem>
                    <MenuItem value="enrolled" onClick = {this.setEnrolled}>
                      <Typography variant="body1">
                        Currently Enrolled
                      </Typography>
                    </MenuItem>
                    <MenuItem value="interested" onClick = {this.setInterested}>
                      <Typography variant="body1">Want to Take</Typography>
                    </MenuItem>
                    <MenuItem value="taken" onClick = {this.setTaken}>
                      <Typography variant="body1">Already Took</Typography>
                    </MenuItem>
                    <MenuItem value="none" onClick = {this.setNone}>
                      <Box fontStyle="italic">
                        <Typography variant="body1">None</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </AccordionDetails>
    );
  }
}

export default Course;

Course.propTypes = {
  category: PropTypes.string.isRequired,
  courseNumber: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  courseTerm: PropTypes.string.isRequired,
  updatePlannerBlock: PropTypes.func.isRequired,
  courseObject: PropTypes.object.isRequired,
  allCourses: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired
}