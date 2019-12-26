import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBookQuery = gql`
  {
    books {
      title
      id
    }
  }
`;

class BookList extends React.Component {
  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <>Loading</>;
    } else {
      return data.books.map(book => {
        return (
          <div>
            <li>{book.title}</li>
          </div>
        );
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <li>{this.displayBooks()}</li>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
