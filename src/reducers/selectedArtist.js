import * as types from '../actions/types';

const initialState = {
  data: {},
  loading: false,
  error: false,
};

const selectedArtist = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_ARTIST_INFO:
      return {
        ...state,
        loading: true,
        error: false,
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
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default selectedArtist;
