import axios from 'axios';

const setUserListStart = () => {
  return {
    type: 'SET_USER_LIST_START',
    payload: { error: null, deleteError: null } 
  };
};

const setUserListSuccess = data => {

  return {
    type: 'SET_USER_LIST_SUCCESS',
    payload: { users: data }
  };
};

const setUserListError = err => {
  return {
    type: 'SET_USER_LIST_ERROR',
    payload: { error: err }
  };
};

export const setUserList = () => dispatch => {
  dispatch(setUserListStart());
  axios
    .get('http://localhost:5000/api/users')
    .then(res => dispatch(setUserListSuccess(res.data)))
    .catch(err => dispatch(setUserListError(err)));
};



const createUserStart = () => {
  return {
    type: 'CREATE_USER_START',
    payload: {}
  };
};

const createUserSuccess = userData => {

  return {
    type: 'CREATE_USER_SUCCESS',
    payload: userData
  };
};

const createUserError = err => {
  return {
    type: 'CREATE_USER_ERROR',
    payload: { error: err }
  };
};

export const createUser = userData => dispatch => {
  dispatch(createUserStart());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .post('http://localhost:5000/api/users', userData, config)
    .then(res => dispatch(createUserSuccess(res.data)))
    .catch(err => dispatch(createUserError(err)));
};

export const initUser = () => dispatch => {
  dispatch({
    type: 'INIT_USER',
    payload: {
      firstname: '',
      lastname: '',
      sex: '',
      age: '',
      description: '',
      createSuccess: false,
      error: null
    }
  });
};



const editUserStart = () => {
  return {
    type: 'EDIT_USER_START',
    payload: {}
  };
};

const editUserSuccess = userData => {

  return {
    type: 'EDIT_USER_SUCCESS',
    payload: userData
  };
};

const editUserError = err => {
  return {
    type: 'EDIT_USER_ERROR',
    payload: { error: err }
  };
};

export const editUser = (userData, history, initEdit) => dispatch => {
  dispatch(editUserStart());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .put(`http://localhost:5000/api/users/${userData.id}`, userData, config)
    .then(res => {
      dispatch(editUserSuccess(res.data));
   
      history.push('/');
      initEdit();
    })
    .catch(err => dispatch(editUserError(err)));
};



export const initEdit = () => dispatch => {

  dispatch({
    type: 'INIT_EDIT',
    payload: {
      firstname: '',
      lastname: '',
      sex: '',
      age: '',
      description: '',
      editSuccess: false,
      error: null
    }
  });
};


const deleteUserStart = () => {
  return {
    type: 'DELETE_USER_START',
    payload: {}
  };
};
const userViewStart = () => {
  return {
    type: 'USER_VIEW',
    payload: {}
  };
};

const deleteUserSuccess = () => {
  // console.log(userData);
  return {
    type: 'DELETE_USER_SUCCESS'
    // payload: userData
  };
};

const deleteUserError = err => {
  return {
    type: 'DELETE_USER_ERROR',
    payload: { deleteError: err }
  };
};

export const deleteUser = id => dispatch => {
  dispatch(deleteUserStart());
  axios
    .delete(`http://localhost:5000/api/users/${id}`)
    .then(() => {
      dispatch(deleteUserSuccess()); 
      dispatch(setUserList());
    })
    .catch(err => dispatch(deleteUserError(err)));
};
export const userView = id => dispatch => {
  dispatch(userViewStart());
  axios
    .get(`http://localhost:5000/api/users/${id}`)
    .then((res) => {
      const { firstname, lastname, sex, age, description } = res.data;
      const userData = { firstname, lastname, sex, age, description };
      dispatch(getUserSuccess(userData));
    })
    .catch(err => dispatch(getUserError(err)));
};



const getUserStart = () => {
  return {
    type: 'GET_USER_START',
    payload: {}
  };
};

const getUserSuccess = userData => {
  
  return {
    type: 'GET_USER_SUCCESS',
    payload: { user: userData }
  };
};

const getUserError = err => {
  return {
    type: 'GET_USER_ERROR',
    payload: { error: err }
  };
};

export const getUser = (id, setUserData) => dispatch => {
  dispatch(getUserStart());
  axios
    .get(`http://localhost:5000/api/users/${id}`)
    .then(res => {
      const { firstname, lastname, sex, age, description } = res.data;
      const userData = { firstname, lastname, sex, age, description };
      dispatch(getUserSuccess(userData));
      setUserData(userData);
    })
    .catch(err => dispatch(getUserError(err)));
};
