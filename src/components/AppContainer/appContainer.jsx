import React, { Component, Fragment } from "react";
import { getFeeds } from "../../services/fakeFeedServices";
import FeedBox from "../FeedBox/feedBox";
import FeedRegistration from "../FeedRegistration/feedRegistration";
class AppContainer extends Component {
  state = {
    feeds: getFeeds(),
  };
  handleSubmit = (e, { title, content, category }) => {
    e.preventDefault();
    const feed = {
      _id: Math.random(),
      title: title,
      content: content,
    };
    const Newfeeds = [feed, ...this.state.feeds];
    console.log(Newfeeds);
    this.setState({ feeds: Newfeeds });
  };
  handleDelete = (id) => {
    console.log("id : ", id);
    console.log("deleted....");
    const newFeeds = this.state.feeds.filter((feed) => feed._id !== id);
    console.log(newFeeds);
    this.setState({ feeds: newFeeds });
  };
  render() {
    console.log("feeds:", this.state.feeds);
    return (
      <Fragment>
        <FeedBox feeds={this.state.feeds} handleDelete={this.handleDelete} />
        <FeedRegistration handleSubmit={this.handleSubmit} />
      </Fragment>
    );
  }
}

export default AppContainer;
