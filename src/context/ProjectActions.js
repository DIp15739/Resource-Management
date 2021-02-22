import db from '../db/firebase';
import {
  CREATE_PROJECT,
  READ_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  UNSET_LOADING,
} from './type';

export const fetchProjects = (dispatch) => {
  db.database()
    .ref('Project')
    .get()
    .then((snapshot) => {
      const projects = snapshot.val();
      const projectsList = [];
      for (let id in projects) {
        projectsList.push({ id, ...projects[id] });
      }
      dispatch({ type: READ_PROJECTS, projects: projectsList });
      dispatch({ type: UNSET_LOADING });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: UNSET_LOADING });
    });
};

export const createProject = (data, dispatch, cb) => {
  const res = db
    .database()
    .ref('Project')
    .push(data, (err) => cb(err));

  dispatch({ type: CREATE_PROJECT, project: { id: res.key, ...data } });
};

export const updateProject = (data, dispatch, cb) => {
  db.database()
    .ref('Project')
    .child(data.id)
    .update(data, (err) => cb(err));

  dispatch({ type: UPDATE_PROJECT, project: data });
};

export const deleteProject = (id, dispatch, cb) => {
  db.database()
    .ref('Project')
    .child(id)
    .remove((err) => cb(err));

  dispatch({ type: DELETE_PROJECT, id });
};
