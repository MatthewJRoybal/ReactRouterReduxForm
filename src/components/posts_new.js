import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import { Field, reduxForm } from 'redux-form';
// redux form is just like connector function
// Allows our component to communicate with redux store
// reduxForm handles the data, its up to us to tell it how to display
// it


class PostsNew extends Component {
  renderTextField(field) {
    // check out destructoring
    const { meta : { touched, error} } = field; // Why does this allow field to be removed?
    // field.meta.touched --> meta.touched??? --> meta??
    const className=`form-group ${touched && error ? 'has-danger' : ''} ${touched && !error ? 'has-success' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
        {
        // If the user has touched the field, show an error if one
        // exists, otherwise do not show any error messages.
        }
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // onSubmit, will automtically redirect to home page. It must match an existing route
    // Create a callback with this.props.history.push to wait for post creation
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // the reduxForm fn atthe bottom is adding a lot of additional
    // properties that is passed to the component. The handleSubmit
    // is being passed to the component from reduxForm
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Create a New Post!</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            // Field component doesn't know how to show itself on the screen
            // It only knows how to interact with reduxForm.
            // The component attribute makes the connection
            // about how it should look with JSX
            label="Title" // use field.label in component fn to show
            name="title" // Name of piece of state in reduxForm
            placeholder="What's the title?"
            component={this.renderTextField}
          />
          <Field
            label="Categories"
            name="categories"
            placeholder="Give it a category"
            component={this.renderTextField}
          />
          <Field
            label="Post Content"
            name="content"
            placeholder="Write your content"
            component={this.renderTextField}
          />
          <button type="submit" className="btn btn-warning">Submit</button>
          <Link type="submit" className="btn btn-danger" to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  // If we return an empty object at the end of the function, then
  // the form is fine to submit. However, if that object has any
  // properties assigned to it, it will fail validation and
  // not submit the form.
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if (!values.categories) {
    errors.categories = "Enter a cagtegory";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }
  return errors;
}

// Works just like connect function wrapping the component allowing it
// to communicate directly with the reducer from reduxForm
export default reduxForm({
  // configuration options for redux form
  // By providing a unique string here, we ensure if we are showing different
  // forms at the same time, reduxForm will handle them all correctly.
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
