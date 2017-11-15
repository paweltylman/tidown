import * as types from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const artist = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_ARTIST_INFO:
      return {
        ...state,
        loading: true,
      };
    case types.REC_ARTIST_INFO:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case types.ERR_ARTIST_INFO:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default artist;
