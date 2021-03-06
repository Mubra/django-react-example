/*
 *
 * Timeline reducer
 *
 */

import { fromJS } from 'immutable';
import {DEFAULT_ACTION, UPVOTE_PROCESS, DOWNVOTE_PROCESS,
  UPVOTE_SUCCESS, DOWNVOTE_SUCCESS,
  TIMELINE_FETCH_PROCESS, TIMELINE_FETCH_SUCCESS, PAGINATED_TIMELINE_FETCH_SUCCESS, PAGINATED_TIMELINE_FETCH_PROCESS} from "./constants";

export const initialState = fromJS({
  notes: [],
  next_link: null,
});

function timelineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TIMELINE_FETCH_SUCCESS:
      return state.set('notes', action.notes);
    case PAGINATED_TIMELINE_FETCH_PROCESS:
      if(action.isInitial === true) return initialState;
      return state;
    case PAGINATED_TIMELINE_FETCH_SUCCESS:
      return state.update('notes', list => list.push(...action.notes)).set('next_link', action.next_link);
    case DOWNVOTE_SUCCESS:
    case UPVOTE_SUCCESS:
      let notes = state.get('notes').map(note => {
        if (note.id === action.note_id){
          note.votes = action.new_votes;
        }
        return note
      });
      return state.set('notes', notes);
    default:
      return state;
  }
}

export default timelineReducer;
