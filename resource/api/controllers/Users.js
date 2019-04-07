const Joi = require('joi');
// DUMMY DATA
const users = require('./../model/user');

// VALIDATION OF DATA
const detailsValidation = (userDetails) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(4).max(50).required(),
    type: Joi.string().required(),
    isAdmin: Joi.required(),
  };
  return Joi.validate(userDetails, schema);
};
const idValidation = (id) => {
  return users.find ( user => user.id === parseInt (id));
};

// GET USER FUNCTION
const getUsers = (req, res) =>{
  res.status(200).json({
    data: users,
 });
};

// GET USER BY ID FUNCTION
const getUserById = (req, res) => {
  const userData = idValidation(req.params.id);
  if (!userData) res.status(404).json({ error: 'User not found' });
  res.status(200).json({
    data: userData,
  });
};

// POST USER FUNCTION
const postUser = (req, res) => {
  const result = detailsValidation(req.body);
  if (result.error) return res.status(404).json({ error: result.error.details[0].message});
  const userEmail = users.find(user => user.email === req.body.email);
  if (userEmail) return res.json({error: 'Email already in use'});
  const user = {
    id: users.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    type: req.body.type,
    isAdmin: req.body.isAdmin,
  };
  users.push(user);
  res.status(201).json({ message: 'Registration was Successful' });
};
// POST SIGN IN USER
const loginUser = (req, res) => { 
 const mail = users.find( user=> user.email === req.body.email);
  if (!mail) return res.status(404).json( {error: 'Incorrect email address'} );
 const data = users.find(user => user.password === req.body.password && mail.email === req.body.email);
  if (!data) return res.status(404).json( {error: 'Incorrect Password'} );
  res.status(200).json(data)
};

// PUT USER FUNCTION
const putUser = (req, res) => {
  let userData = idValidation(req.params.id);
  if(!userData) res.status(404).json({ error: 'User not found' });
  const result =  detailsValidation(req.body);
  if(result.error) return res.status(400).json({ error: result.error.details[0].message});
  userData.email = req.body.email;
  userData.firstName = req.body.firstName;
  userData.lastName = req.body.lastName;
  userData.password = req.body.password;
  userData.type = req.body.type;
  res.status(200).json({userData });
};
// DELETE USER FUNCTION
const deleteUser = (req, res) => {
let userData = idValidation(req.params.id);
  if(!userData) res.status(404).json({ error: 'User not found'});
  const data = users.indexOf(userData);
  users.splice(data, 1);
  res.status(204).json({ message: 'User has been deleted' });
};

module.exports = { getUsers, getUserById, postUser, loginUser, putUser, deleteUser  };
