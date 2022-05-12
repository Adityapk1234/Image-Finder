import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: "",
  };

  handleOpen = (img) => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={4}>
          {images.map((img) => (
            <GridTile
              key={img.id}
              onClick={() => this.handleOpen(img.largeImageURL)}
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />,
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageResults;
