import * as types from '../actions/types';

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const artists = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_ARTISTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.REC_ARTISTS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case types.ERR_ARTISTS:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default artists;
