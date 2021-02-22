import db from '../db/firebase';
import {
  CREATE_RESOURCE,
  DELETE_RESOURCE,
  READ_RESOURCES,
  UPDATE_RESOURCE,
} from './type';

export const fetchResources = (dispatch) => {
  db.database()
    .ref('Resource')
    .get()
    .then((snapshot) => {
      const resources = snapshot.val();
      const resourcesList = [];
      for (let id in resources) {
        resourcesList.push({ id, ...resources[id] });
      }
      dispatch({ type: READ_RESOURCES, resources: resourcesList });
    });
};

export const createResource = (data, dispatch, cb) => {
  const res = db
    .database()
    .ref('Resource')
    .push(data, (err) => cb(err));

  dispatch({ type: CREATE_RESOURCE, resource: { id: res.key, ...data } });
};

export const updateResource = (data, dispatch, cb) => {
  db.database()
    .ref('Resource')
    .child(data.id)
    .update(data, (err) => cb(err));

  dispatch({ type: UPDATE_RESOURCE, resource: data });
};

export const deleteResource = (id, dispatch, cb) => {
  db.database()
    .ref('Resource')
    .child(id)
    .remove((err) => cb(err));

  dispatch({ type: DELETE_RESOURCE, id });
};
