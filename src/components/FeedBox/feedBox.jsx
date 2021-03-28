import React, { Component } from "react";
import Feed from "../Feed/feed";
import "./feedBox.css";
class FeedBox extends Component {
  state = {
    feeds: [
      {
        _id: 1,
        title: "Title 1",
        content:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate .",
      },
      {
        _id: 2,
        title: "Title 2",
        content:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate .",
      },
      {
        _id: 3,
        title: "Title 3",
        content:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate .",
      },
      {
        _id: 4,
        title: "Title 4",
        content:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate .",
      },
    ],
  };
  render() {
    return (
      <div className="feedBox">
        {this.state.feeds.map((feed) => (
          <Feed key={feed._id} title={feed.title} content={feed.content} />
        ))}
      </div>
    );
  }
}

export default FeedBox;
