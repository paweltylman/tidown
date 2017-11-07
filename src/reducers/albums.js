import * as types from '../actions/types';

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const albums = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_ARTISTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.REC_ALBUMS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case types.ERR_ALBUMS:
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

export default albums;
