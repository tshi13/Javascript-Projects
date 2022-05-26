import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import Output from "./components/Output";
import React, {Component} from "react";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        url : "",
        topWord : "",
        bottomWord: ""
    };
  }

  updatePicture = (picture, top, bottom) => { //set new state for picture and text
    this.setState({
        url: picture.url,
        topWord: top,
        bottomWord: bottom
    });
  };
  
  render() {
    return (
      <>
        <Header />
        <Search updateUI={this.updatePicture}/>
        <Output url = {this.state.url}
                topWord = {this.state.topWord}
                bottomWord = {this.state.bottomWord}
                />
        <Footer />
      </>
    );
  }
}


export default App;
