import React, { Component } from "react";
import { Route, withRouter, Link, matchPath } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import RecipePage from "./RecipePage";
import Login from "./Login";
import User from "./User";
import { slugify } from "../helpers";
import recipes from "../sample_data/recipes.json";
import PropTypes from "prop-types";

const HomeRoute = ({}) => <Home recipes={recipes} />;

const LoginRoute = () => <Login />;
const ProfileRoute = () => <User />;
const RecipePageRoute = ({ match, searchString }) => (
  <RecipePage recipes={recipes} match={match} searchString={searchString} />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: this.props.location.pathname,
      searchString: ""
    };
  }

  componentWillMount() {
    const { pathName } = this.state;

    let path = pathName.replace("/", "");

    this.setState({
      searchString: path,
      pathName: path
    });
  }

  render() {
    let { searchString } = this.state;
    const { history } = this.props;

    const { pathname } = this.props.location;

    const match = matchPath(pathname, {
      path: pathname,
      exact: true,
      strict: false
    });

    return (
      <div className='App'>
        <Route
          exact
          path='/recipe/:searchString?'
          children={({ match }) => (
            <Navbar
              searchString={match ? match.params.searchString || "" : ""}
              onchange={searchString => history.push(`/recipe/${searchString}`)}
            />
          )}
        />

        <div className='container mt-10'>
          <Route exact path='/recipe/:recipeSlug' component={RecipePageRoute} />
          <Route path='/user/login' component={LoginRoute} />
          <Route path='/user/profile' component={ProfileRoute} />
          <Route exact path='/' component={HomeRoute} />

          {console.log(`recipe/${slugify(searchString)}`)}
          {console.log("match: ", match)}
          {console.log("path >>>: ", match.path)}
          {console.log("searchString: ", searchString)}
          {console.log("pathname", pathname)}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.object
};

export default withRouter(App);
