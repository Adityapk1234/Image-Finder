import React, { Component } from "react";
import TextField from "material-ui/TextField";

import axios from "axios";
import ImageResults from "../image-results/ImageResults";

class Search extends Component {
  state = {
    searchText: "",
    apiUrl: process.env.REACT_APP_API_URL,
    apiKey: process.env.REACT_APP_API_KEY,
    images: [],
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&safesearch=true`
          )
          .then((res) => this.setState({ images: res.data.hits }))
          .catch((err) => console.log(err));
      }
    });
  };

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          style={{ marginLeft: "0.8rem" }}
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          placeholder="Search For Images"
          width="100px"
        />

        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
