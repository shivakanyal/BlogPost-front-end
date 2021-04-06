import React, { Component, Fragment } from "react";
import { getFeeds } from "../../services/fakeFeedServices";
import FeedBox from "../FeedBox/feedBox";
import FeedRegistration from "../FeedRegistration/feedRegistration";
import { Redirect, Route, Switch } from "react-router-dom";
import FeedView from "../FeedView/feedView";
import NotFound from "../NotFound/notFound";
class AppContainer extends Component {
  state = {
    feeds: getFeeds(),
  };
  handleSubmit = (e, { id, title, content, category, history }) => {
    e.preventDefault();
    const feed = {
      _id: Math.random(),
      title: title,
      content: content,
      category: category,
    };
    const Newfeeds = [feed, ...this.state.feeds];
    this.setState({ feeds: Newfeeds });
    history.push("/articles");
  };
  handleDelete = (id) => {
    const newFeeds = this.state.feeds.filter((feed) => feed._id !== id);
    console.log(newFeeds);
    this.setState({ feeds: newFeeds });
  };

  handleEdit = (e, { id, title, content, category, history }) => {
    e.preventDefault();
    id = parseInt(id);
    const feeds = [...this.state.feeds];
    const index = this.state.feeds.findIndex(
      (feed) => feed._id.toString() === id.toString()
    );
    feeds[index] = { _id: id, title, content, category };
    this.setState({ feeds: feeds });
    history.push("/articles");
  };
  render() {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/articles/register/:id"
            render={(props) => (
              <FeedRegistration
                handleSubmit={this.handleEdit}
                feeds={this.state.feeds}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/articles/register"
            render={(props) => (
              <FeedRegistration handleSubmit={this.handleSubmit} {...props} />
            )}
          />
          <Route
            exact
            path="/articles/:id"
            render={(props) => (
              <FeedView feeds={this.state.feeds} test="test" {...props} />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Route path="/articles" exact>
            <FeedBox
              feeds={this.state.feeds}
              handleDelete={this.handleDelete}
            />
          </Route>

          <Redirect exact from="/" to="/articles" />
          <Redirect to="/not-found" />
        </Switch>
      </Fragment>
    );
  }
}
export default AppContainer;
