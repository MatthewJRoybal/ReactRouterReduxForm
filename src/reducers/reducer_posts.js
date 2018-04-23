import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
  case DELETE_POST:
    return _.omit(state, action.payload);
  case FETCH_POST:
    // const post = action.payload.data;
    // Three lines below are exactly the same as the return statement
    // const newState = { ...state,  };
    // newState[post.id] = post;
    // return newState;

    // 1. put all existing posts into new object to avoid state mutation
    // 2. Place a key onto action.payload.data of id
    // 3. Finally, assign action.payload.data.id to action.payload.data
    return { ...state, [action.payload.data.id]: action.payload.data };
  case FETCH_POSTS:
    // [{ id: 1, title: "Hello"}, { id: 2, title: "Bye"}] -->
    // { 1: { id: 1, title: "Hello"}, 2:{ id: 2, title: "Bye"} }
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
};
