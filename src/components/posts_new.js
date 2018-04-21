import React, { Component } from 'react';
import Form from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-danger" to="/">
            Return Home
          </Link>
        </div>
        <h3>PostsNew!</h3>
      </div>
    );
  }

}

export default PostsNew;
