import { Container, Grid } from "@material-ui/core";
import React, { Component } from "react";
import Feed from "../Feed/feed";
import "./feedBox.css";
class FeedBox extends Component {
  render() {
    return (
      <Container>
        <Grid container justify="center" alignItems="center" container>
          {this.props.feeds.map(({ _id, title, content }) => (
            <Grid item container spacing={3} md={4} sm={6} xs={12}>
              <Feed
                _id={_id}
                title={title}
                content={content}
                handleDelete={this.props.handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default FeedBox;
