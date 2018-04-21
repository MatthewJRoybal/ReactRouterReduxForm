import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_POSTS:
    // [{ id: 1, title: "Hello"}, { id: 2, title: "Bye"}] -->
    // { 1: { id: 1, title: "Hello"}, 2:{ id: 2, title: "Bye"} }
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
};
