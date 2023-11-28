const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'No user found' }));
});


router.get('/:userId', (req, res) => {
  User.findById({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: 'No user found by this id' }));
});


router.post('/search', (req, res) => {
  User.find()
    .then(users =>
      users.filter(
        user =>
          user.firstname
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.lastname
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.sex
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.age.toString().indexOf(req.body.query.toString()) !== -1
      )
    )
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'No user found' }));
});


router.post('/sort', (req, res) => {

  User.find()
    .then(users => {
      switch (req.body.attribute) {
    
        case 'firstname':
          return [...users].sort((a, b) =>
            a.firstname > b.firstname
              ? 1
              : a.firstname === b.firstname
              ? a.lastname > b.lastname
                ? 1
                : a.lastname === b.lastname
                ? a.age > b.age
                  ? 1
                  : a.age === b.age
                  ? a.sex > b.sex
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        case 'lastname':
          return [...users].sort((a, b) =>
            a.lastname > b.lastname
              ? 1
              : a.lastname === b.lastname
              ? a.firstname > b.firstname
                ? 1
                : a.firstname === b.firstname
                ? a.age > b.age
                  ? 1
                  : a.age === b.age
                  ? a.sex > b.sex
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        case 'sex':
          return [...users].sort((a, b) =>
            a.sex > b.sex
              ? 1
              : a.sex === b.sex
              ? a.firstname > b.firstname
                ? 1
                : a.firstname === b.firstname
                ? a.lastname > b.lastname
                  ? 1
                  : a.lastname === b.lastname
                  ? a.age > b.age
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        case 'age':
       
          return [...users].sort((a, b) =>
            a.age > b.age
              ? 1
              : a.age === b.age
              ? a.firstname > b.firstname
                ? 1
                : a.firstname === b.firstname
                ? a.lastname > b.lastname
                  ? 1
                  : a.lastname === b.lastname
                  ? a.sex > b.sex
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
          );

        default:
          return [...users];
      }
    })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'Failed to sort' }));
});


router.post('/', (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    sex: req.body.sex,
    age: req.body.age,
    description: req.body.description
  });
  newUser
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to create' + err }));
});


router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      sex: req.body.sex,
      age: req.body.age,
      description: req.body.description
    }
  })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to edit' }));
});


router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to delete' }));
});

module.exports = router;
