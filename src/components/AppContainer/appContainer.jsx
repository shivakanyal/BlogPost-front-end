import React, { Component, Fragment } from "react";
// import { getFeeds } from "../../services/fakeFeedServices";
import FeedBox from "../FeedBox/feedBox";
import FeedRegistration from "../FeedRegistration/feedRegistration";
import { Redirect, Route, Switch } from "react-router-dom";
import FeedView from "../FeedView/feedView";
import NotFound from "../NotFound/notFound";
class AppContainer extends Component {
  state = {
    feeds: [],
  };
  componentDidMount() {
    fetch("http://localhost:8080/feed/posts", {
      method: "GET",
      //  headers:{
      //    Authorization:"Bearer " + localStorage.getItem("token")
      //  }
    })
      .then((posts) => {
        return posts.json();
      })
      .then(({ posts }) => {
        console.log(posts);
        this.setState({ feeds: posts });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit = (e, { id, title, content, category, image, history }) => {
    e.preventDefault();
    const feed = {
      // _id: Math.random(),
      title: title,
      content: content,
      category: category,
      image: image,
    };

    console.log("hey i am running ");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", image);
    console.log("formData:", formData);
    fetch("http://localhost:8080/feed/post", {
      method: "POST",
      // body: JSON.stringify({
      //   title: title,
      //   content: content,
      //   category: category,
      // }),
      body: formData,
      // There will not be any header for FormData
      // Header for form-data will automatically get appended.
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const Newfeeds = [feed, ...this.state.feeds];
        this.setState({ feeds: Newfeeds });
        history.push("/articles");
      })
      .catch((err) => console.log("error:", err));

    // Updating The UI
  };
  handleDelete = (id) => {
    const prevFeeds = this.state.feeds;
    const newFeeds = this.state.feeds.filter((feed) => feed._id !== id);
    console.log(newFeeds);
    this.setState({ feeds: newFeeds });
    fetch("http://localhost:8080/feed/post/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => console.log(result))
      .catch((err) => {
        alert("Some error occur");
        this.setState({ feeds: prevFeeds });
        console.log("inside error", err);
      });
  };
  handleEdit = (e, { id, title, content, category, image, history }) => {
    e.preventDefault();
    // id = parseInt(id);

    console.log("id:", id);
    const feeds = [...this.state.feeds];
    const index = this.state.feeds.findIndex(
      (feed) => feed._id.toString() === id.toString()
    );
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", image);

    fetch("http://localhost:8080/feed/post/" + id, {
      method: "PUT",
      body: formData,
    });

    console.log("index", index);
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
