import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser, initUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import { Loading, Alert } from './utils';

const CreateUser = ({
  setAlert,
  createUser,
  alertContent,
  history,
  createSuccess,
  isLoading,
  error
}) => {
  // useEffect(() => initUser(), []); // may not need anymore
  const stdSex = ['f', 'm', 'female', 'male'];

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    sex: '',
    age: '',
    description: '',
    repeat: ''
  });

  const { firstname, lastname, sex, age, description, repeat } = userData;


  const handleCreate = e => {
    e.preventDefault();
      createUser({ firstname, lastname, sex, age, description });
    
  };

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    history.push('/');
  };

  const disableCreate = (firstname, lastname, sex, age, description, repeat) => {
    return !(
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
    );
  };

  return (
    <div>
      {createSuccess ? (
        <Redirect to='/' />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>Create User</div>
          <div className='container'>
            <form onSubmit={e => handleCreate(e)}>
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
                {sex &&
                  ['f', 'm', 'female', 'male'].indexOf(sex.toLowerCase()) ===
                    -1 && <Alert warning='invalid' item='sex' />}
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
                {/* test server error here cause server will return err when age is not a number */}
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
              {error && <Alert warning='server' item='create' />}
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      disableCreate(
                        firstname,
                        lastname,
                        sex,
                        age,
                        description,
                        repeat
                      )
                      
                    }
                  >
                    <i className='fas fa-arrow-down' /> Add User
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
    createSuccess: state.createUser.createSuccess,
    isLoading: state.createUser.isLoading,
    error: state.createUser.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),

    createUser: data => dispatch(createUser(data)),
    initUser: () => dispatch(initUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
