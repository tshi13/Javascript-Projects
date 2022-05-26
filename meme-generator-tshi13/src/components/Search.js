import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topWord: "",
      bottomWord: "",
    };
  }

  changeTopWord = (event) => { //set state for top text
    this.setState({topWord: event.target.value});
  }
  
  changeBottomWord = (event) => { // set state for bottom text
    this.setState({bottomWord: event.target.value});
  }

  fetchMemes = async (event) => { // fetch memes
    event.preventDefault();
    const memeAPI = "https://api.imgflip.com/get_memes";
    try {
      const response = await axios.get(`${memeAPI}`);
      const data = response.data;
      const image = data.data.memes[Math.floor(Math.random() * data.data.memes.length)]; 
      this.props.updateUI(image,this.state.topWord, this.state.bottomWord); //update UI, send new state to app.js
    } catch (err) {
      console.log(err);
    }
  }


  render(){
    return(
      <section className="section">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-large is-fullwidth is-family-monospace"
              id="top-input"
              placeholder="Top text"
              type="text"
              value = {this.state.topWord}
              onChange={this.changeTopWord} //update state
            />
          </div>
        </div>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-large is-fullwidth is-family-monospace"
              id="bottom-input"
              placeholder="Bottom text"
              type="text"
              value = {this.state.bottomWord}
              onChange={this.changeBottomWord} //update state
            />
          </div>
        </div>
        <div className="field has-addons">
          <div className="control is-expanded">
            <button 
              className="button is-link is-large is-fullwidth" 
              id="go-btn"
              onClick={this.fetchMemes} //fetch memes when user clicks button
            >
              Go!
            </button>
          </div>
        </div>
      </section>

    );
  }
}

export default Search;

Search.propTypes = {
  updateUI: PropTypes.func.isRequired
};
