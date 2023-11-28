import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, initEdit } from '../redux/action-creators/users';
import { getUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import { Loading, Alert } from './utils';
// import axios from 'axios';

const EditUser = ({
  alertContent,
  history,

  match,
  isLoading,
  isGetting,

  getUser,
 
}) => {
  const id = match.params.userId;

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    sex: '',
    age: '',
    description: '',
    repeat: ''
  });

  useEffect(() => {
    getUser(id, setUserData);
  }, []);

  const { firstname, lastname, sex, age, description } = userData;

 


  const handleBack = () => {
    history.push('/');
  };



  

  return (
    <div>
      {
      isLoading || isGetting ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>View User</div>
          <div className='container'>

              <div className='form-group'>
                First Name:{' '}
                <h3>{firstname}</h3>
              </div>
              <div className='form-group'>
                Last Name:{' '}
              <h3>{lastname}</h3>
              </div>
              <div className='form-group'>
                Sex:{' '}
              <h3>{sex}</h3>
                
              </div>
              <div className='form-group'>
                Age:{' '}
              <h3>{age}</h3>
          
              </div>
              <div className='form-group'>
                Description:{' '}
              <h3>{description}</h3>
                
              </div>
             
              <div className='btn-row'>
                <div className='btn-middle'>
                  <button className='btn btn-secondary' onClick={handleBack}>
                    <i className='fas fa-arrow-left' /> Back
                  </button>
                </div>
              </div>
            
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
