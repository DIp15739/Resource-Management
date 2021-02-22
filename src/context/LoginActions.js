import db from '../db/firebase';
import { LOGIN, SIGNUP } from '../context/type';

export const signin = (username, password, dispatch, cb) => {
  db.database()
    .ref('users')
    .get()
    .then((s) => {
      const users = s.val();
      let user = null;
      for (let u in users) {
        if (users[u].username == username && users[u].password == password) {
          user = u;
        }
      }

      if (user) {
        dispatch({ type: LOGIN });
        localStorage.setItem('isLoggin', true);
      } else {
        cb();
      }
    });
};

export const signup = (username, password, dispatch, cb) => {
  db.database()
    .ref('users')
    .push({ username, password }, (err) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        dispatch({ type: SIGNUP });
        localStorage.setItem('isLoggin', true);
      }
    });
};
