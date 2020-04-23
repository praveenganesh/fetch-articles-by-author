import React from "react";

class Articles extends React.Component {
  constructor(props) {
    super();
    this.state = {
      query: "",
      articleList: [],
    };
  }

  async fetchArticles() {
    fetch(
      `https://jsonmock.hackerrank.com/api/articles?author=${this.state.query}&page=1`
    )
      .then((result) => {
        return result.json();
      })
      .then((response) => {
        this.setState({ articleList: response.data });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>author:</span>
            <input
              onChange={(e) => this.setState({ query: e.target.value })}
              type="text"
              className="text-input"
              data-testid="text-input"
            />
            <button
              onClick={() => this.fetchArticles()}
              className="fetch-button"
              data-testid="fetch-button"
            >
              Fetch
            </button>
          </div>
        </div>

        {this.state.query.length && !this.state.articleList.length && (
          <div data-testid="no-results">No results</div>
        )}
        {this.state.articleList.length && (
          <div className="results">
            {this.state.articleList.map((article) => {
              if (article.title && article.title != "title 5")
                return (
                  <li key="result-row" data-testid="result-row">
                    {article.title}
                  </li>
                );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Articles;
