import React, { Component, Fragment } from "react";
import { getFeeds } from "../../services/fakeFeedServices";
import FeedBox from "../FeedBox/feedBox";
import FeedRegistration from "../FeedRegistration/feedRegistration";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import FeedView from "../FeedView/feedView";
import NotFound from "../NotFound/notFound";
class AppContainer extends Component {
  state = {
    feeds: getFeeds(),
  };
  handleSubmit = (e, { title, content, category, history }) => {
    e.preventDefault();
    const feed = {
      _id: Math.random(),
      title: title,
      content: content,
    };
    const Newfeeds = [feed, ...this.state.feeds];
    console.log(Newfeeds);
    this.setState({ feeds: Newfeeds });
    history.push("/articles");
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
        <Switch>
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
