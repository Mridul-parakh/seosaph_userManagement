import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, initEdit } from '../redux/action-creators/users';
import { getUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import { Loading, Alert } from './utils';
// import axios from 'axios';

const EditUser = ({
  setAlert,
  editUser,
  alertContent,
  history,
  editSuccess,
  match,
  isLoading,
  isGetting,
  initEdit,
  getUser,
  user,
  error,
  getError
}) => {
  const id = match.params.userId;
  const stdSex = ['f', 'm', 'female', 'male'];

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    sex: '',
    age: '',
    description: '',
    repeat: ''
  });

  // const getUserById = (id, setUserData) => {
  //   axios
  //     .get(`http://localhost:5000/api/users/${id}`)
  //     .then(res => {
  //       setUserData({
  //         ...userData,
  //         firstname: res.data.firstname,
  //         lastname: res.data.lastname,
  //         sex: res.data.sex,
  //         age: res.data.age
  //       });
  //     })
  //     .catch(err => setAlert(err));
  // };

  // const cbGetUserById = useCallback((id, getUserById, setUserData) => {
  //   getUserById(id, setUserData);
  // }, id);

  useEffect(() => {
    getUser(id, setUserData);
    // return () => {
    //   setUserData({ ...user });
    // };
    // getUserById(id, setUserData);
  }, []);

  const { firstname, lastname, sex, age, description, repeat } = userData;

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEdit = e => {
    e.preventDefault();
      editUser(
        { id, firstname, lastname, sex, age, description },
        history,
        initEdit
      ); // pass init and push into action-creator and let it exec
    
  };

  const handleBack = () => {
    history.push('/');
  };

  const disableEdit = (
    firstname,
    lastname,
    sex,
    age,
    description,
    repeat,
    user
  ) => {
    return (
      !(
        firstname &&
        lastname &&
        sex &&
        age &&
        description &&
        /^[a-zA-Z]+$/.test(firstname) &&
        /^[a-zA-Z]+$/.test(lastname) &&
        stdSex.indexOf(sex.toLowerCase()) !== -1 &&
        !isNaN(age) &&
        Math.abs(parseInt(age)).toString() === age.toString()
      ) ||
      (user.firstname === firstname &&
        user.lastname === lastname &&
        user.sex === sex &&
        user.age === age &&
        user.description===description)
    );
  };



  return (
    <div>
      {
      isLoading || isGetting ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>Edit User</div>
          <div className='container'>
            <form onSubmit={e => handleEdit(e)}>
              <small className='form-text text-muted'>
                Blank with * is reuiqred
              </small>
              <div className='form-group'>
                * First Name:{' '}
                <input
                  className='form-control'
                  name='firstname'
                  value={firstname}
                  onChange={e => handleChange(e)}
                  placeholder='firstname'
                />
                {!firstname && <Alert warning='empty' item='firstname' />}
                {firstname && !/^[a-zA-Z]+$/.test(firstname) && (
                  <Alert warning='invalid' item='firstname' />
                )}
              </div>
              <div className='form-group'>
                * Last Name:{' '}
                <input
                  className='form-control'
                  name='lastname'
                  value={lastname}
                  onChange={e => handleChange(e)}
                  placeholder='lastname'
                />
                {!lastname && <Alert warning='empty' item='lastname' />}
                {lastname && !/^[a-zA-Z]+$/.test(lastname) && (
                  <Alert warning='invalid' item='lastname' />
                )}
              </div>
              <div className='form-group'>
                * Sex:{' '}
                <input
                  className='form-control'
                  name='sex'
                  value={sex}
                  onChange={e => handleChange(e)}
                  placeholder='sex'
                />
                <small className='form-text text-muted'>
                  Valid inputs are f, m, female, or male, not case sensitive
                </small>
                {!sex && <Alert warning='empty' item='sex' />}
                {sex && stdSex.indexOf(sex.toLowerCase()) === -1 && (
                  <Alert warning='invalid' item='sex' />
                )}
              </div>
              <div className='form-group'>
                * Age:{' '}
                <input
                  className='form-control'
                  name='age'
                  value={age}
                  onChange={e => handleChange(e)}
                  placeholder='age'
                />
                {!age && <Alert warning='empty' item='age' />}
                {age &&
                  (isNaN(age) ||
                    Math.abs(parseInt(age)).toString() !== age.toString()) && (
                    <Alert warning='invalid' item='age' />
                  )}
                {/* test server ERROR here, block validation, let backend do */}
              </div>
              <div className='form-group'>
                * Description:{' '}
                <input
                  className='form-control'
                  type='description'
                  name='description'
                  value={description}
                  onChange={e => handleChange(e)}
                  placeholder='description'
                />
                {!description && <Alert warning='empty' item='description' />}
              </div>
              
              {error && <Alert warning='server' item='edit' />}
              {getError && <Alert warning='server' item='get' />}
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      disableEdit(
                        firstname,
                        lastname,
                        sex,
                        age,
                        description,
                        repeat,
                        user
                      )
                    }
                  >
                    <i className='fas fa-arrow-down' /> Save Changes
                  </button>
                </div>
                <div className='btn-middle' />

                <div className='btn-right'>
                  <button className='btn btn-secondary' onClick={handleBack}>
                    <i className='fas fa-arrow-left' /> Back
                  </button>
                </div>
              </div>
            </form>
            <div className='alert-text'>{alertContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    editSuccess: state.editUser.editSuccess,
    isLoading: state.editUser.isLoading,
    isGetting: state.getUser.isLoading,
    user: state.getUser.user,
    // use this user in file check whether the file be changed in the very bottom
    error: state.editUser.error,
    getError: state.getUser.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    editUser: (data, history) => dispatch(editUser(data, history)),
    initEdit: () => dispatch(initEdit()),
    getUser: (id, setUserData) => dispatch(getUser(id, setUserData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
