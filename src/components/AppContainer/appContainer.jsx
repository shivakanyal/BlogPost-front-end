import React, { Component, Fragment } from "react";
import FeedBox from "../FeedBox/feedBox";
import FeedRegistration from "../FeedRegistration/feedRegistration";
import { Redirect, Route, Switch } from "react-router-dom";
import FeedView from "../FeedView/feedView";
import NotFound from "../NotFound/notFound";
import Login from "../LoginForm/loginForm";
import SignUp from "../SignUpForm/signUpForm";
import Logout from "../Logout/logout";
class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
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

  handleLoginFormSubmit = (e, email, password, history) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        console.log(token);
        localStorage.setItem("token", token);
        if (!token) {
          alert("Email or password is incorrect.");
        } else if (token) {
          this.setState({ isAuthenticate: true });
          window.location = "/articles";
        }
      })
      .catch((err) => {
        console.log(err);
        alert("some error occur");
      });
  };

  handleSubmit = (e, { id, title, content, category, image, history }) => {
    e.preventDefault();
    const feed = {
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
    const tokenn = localStorage.getItem("token");
    console.log("token", tokenn);
    fetch("http://localhost:8080/feed/post", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tokenn,
      },
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
    console.log("image", image);
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
              user={this.props.user}
            />
          </Route>
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login handleSubmit={this.handleLoginFormSubmit} {...props} />
            )}
          />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/signup" component={SignUp} />
          <Redirect exact from="/" to="/articles" />
          <Redirect to="/not-found" />
        </Switch>
      </Fragment>
    );
  }
}
export default AppContainer;
