import * as types from '../actions/types';

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const albums = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_ALBUM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.REC_ALBUM:
      return {
        ...state,
        data: [action.payload],
        loading: false,
        error: false,
      };
    case types.ERR_ALBUM:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.REQ_ARTIST_ALBUMS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.REC_ARTIST_ALBUMS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case types.ERR_ARTIST_ALBUMS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CLEAR_ALBUMS:
      return initialState;
    default:
      return state;
  }
};

export default albums;
