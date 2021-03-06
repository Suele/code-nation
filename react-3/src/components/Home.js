import React, { Component } from "react";
import PropTypes from "prop-types";
import RecipeItem from "./RecipeItem";
import { getRecipesByName } from "../services/recipes";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      page: 1,
      recipes: []
    };
  }

  componentDidMount() {
    const { title, page } = this.state;
    const { match } = this.props;

    if (!match) {
      getRecipesByName(title, page).then(results => {
        this.setState({ recipes: results });
        console.log("recipes: ", this.state.recipes);
      });
    } else {
      getRecipesByName(match, page).then(results => {
        this.setState({ recipes: results });
        console.log(
          "recipes match: ",
          this.state.recipes,
          "page match: ",
          page
        );
      });
    }
  }

  previousRecipes = () => {
    const { title, page } = this.state;
    const { match } = this.props;

    if (page >= 1) {
      this.setState({ page: page - 1 });
    }

    if (match) {
      return getRecipesByName(match, page).then(results => {
        this.setState({ recipes: results });
        console.log("recipes: ", this.state.recipes);
        console.log("previousRecipes: ", page);
      });
    }

    return getRecipesByName(title, page).then(results => {
      this.setState({ recipes: results });
      console.log("recipes: ", this.state.recipes);
      console.log("previousRecipes: ", page);
    });
  };

  nextRecipes = () => {
    const { title, page } = this.state;
    const { match } = this.props;

    this.setState({ page: page + 1 });

    if (match) {
      return getRecipesByName(match, page).then(results => {
        this.setState({ recipes: results });
        console.log("recipes: ", this.state.recipes);
        console.log("match", match);
        console.log("nextRecipes: ", this.state.page);
      });
    }
    return getRecipesByName(title, page).then(results => {
      this.setState({ recipes: results });
      console.log("recipes: ", this.state.recipes);
      console.log("title", title);
      console.log("nextRecipes: ", this.state.page);
    });
  };

  render() {
    const { recipes } = this.state;
    const { match } = this.props;

    return (
      <div>
        {recipes.length > 0 ? (
          <div>
            <div className='row'>
              {recipes.map(recipe => {
                return (
                  <RecipeItem
                    key={recipe.ingredients}
                    thumbnail={recipe.thumbnail}
                    title={recipe.title}
                    ingredients={recipe.ingredients}
                  />
                );
              })}
            </div>
            <div className='d-flex justify-content-center'>
              <nav>
                <ul className='pagination'>
                  <li className='page-item'>
                    <button
                      onClick={this.previousRecipes}
                      id='prev'
                      className='page-link'
                    >
                      Previous
                    </button>
                  </li>
                  <li className='page-item'>
                    <button
                      onClick={this.nextRecipes}
                      id='next'
                      className='page-link'
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        ) : (
          <h1>No Result to show {match}</h1>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.array
};

export default Home;
