import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends React.Component {
  // This is called a lifecycle method. Must be exactly spelled case sensitive
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    // By using the params object, you won't get a button before Loading
    // has completed.
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    // When post comes in, this if statement will resolve.
    if(!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Return Home</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >Delete Post</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}
// The second argument is called 'ownProps'
// this.props === ownProps
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id]};
}

// Pass in null when there is no mapStateToProps
// export default connect(null, { fetchPost })(PostsShow);
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
