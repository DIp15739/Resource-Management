import {
  CREATE_PROJECT,
  CREATE_RESOURCE,
  READ_PROJECTS,
  READ_RESOURCES,
  UPDATE_PROJECT,
  UPDATE_RESOURCE,
  DELETE_PROJECT,
  DELETE_RESOURCE,
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_LOADING,
  UNSET_LOADING,
} from './type';

export const initialState = {
  projects: [],
  resources: [],
  isLoggedIn: false,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Project Reducer
    case CREATE_PROJECT:
      return { ...state, projects: [...state.projects, action.project] };
    case READ_PROJECTS:
      return { ...state, projects: action.projects };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj.id === action.project.id ? action.project : proj
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((proj) => proj.id !== action.id),
      };

    // Resource Reducer
    case CREATE_RESOURCE:
      return { ...state, resources: [...state.resources, action.resource] };
    case READ_RESOURCES:
      return { ...state, resources: action.resources };
    case UPDATE_RESOURCE:
      return {
        ...state,
        resources: state.resources.map((res) =>
          res.id === action.resource.id ? action.resource : res
        ),
      };
    case DELETE_RESOURCE:
      return {
        ...state,
        resources: state.resources.filter((res) => res.id !== action.id),
      };

    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    case SET_LOADING:
      return { ...state, isLoading: true };
    case UNSET_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
