import axios from 'axios';

const FILTER_CAMPUSES = 'FILTER_CAMPUSES';

export const filterCampuses = campuses => {
  return { type: FILTER_CAMPUSES, campuses };
};

export const fetchCampusesThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/campuses');
    const campuses = response.data;
    dispatch(setCampuses(campuses));
  };
};

export const createCampusThunk = campus => {
  return async dispatch => {
    const response = await axios.post('/api/campuses', campus);
    const newCampus = response.data;
    const action = createCampus(newCampus);
    dispatch(action);
  };
};

export const deleteCampusThunk = campusId => {
  return async dispatch => {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(deleteCampus(campusId));
  };
};

export default (campuses = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...campuses, action.campus];
    case DELETE_CAMPUS:
      return campuses.filter(campus => campus.id !== action.campusId);
    default:
      return campuses;
  }
};