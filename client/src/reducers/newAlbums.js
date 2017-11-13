import * as types from '../actions/types';

const initialState = {
  data: {
    newAlbums: [],
    staffPicks: [],
    topAlbums: [],
  },
  loading: false,
  error: false,
};


const newAlbums = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_NEW_ALBUMS:
      return {
        ...state,
        loading: true,
      };
    case types.REC_NEW_ALBUMS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case types.ERR_NEW_ALBUMS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default newAlbums;
