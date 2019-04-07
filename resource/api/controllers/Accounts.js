const Joi = require('joi');
// DUMMY DATA
const accounts = require('./../model/account');

// VALIDATION OF DATA
const accValildation = (data) => {
  const schema = {
    accountNumber: Joi.number().min(8).required(),
    owner: Joi.number().required(),
    type: Joi.string().required(),
    status: Joi.string().required(),
    balance: Joi.number().required(),
  };
  return Joi.validate(data, schema);
};
const idValidation = (id) => {
  return accounts.find ( account => account.id === parseInt (id));
};

// GET ACCOUNT FUNCTION
const getAccounts = (req, res) =>{
  res.status(200).json({
    data: accounts,
  });
};

// GET ACCOUNT BY ID
const getAccountById = (req, res) => {
  const data = idValidation(req.params.id);
  if (!data) res.status(404).json({ error: 'Account not found' });
  res.status(200).json({
    data: data,
  });
};

// POST ACCOUNT FUNCTION
const postAccount = (req, res) => {
  const result = accValildation(req.body);
  if (result.error) return res.status(404).json({ error: result.error.details[0].message});
  const account = {
    id: accounts.length + 1,
    accountNumber: req.body.accountNumber,
    createdOn: new Date(),
    owner: req.body.owner,
    type: req.body.type,
    status: req.body.status,
    balance: req.body.balance,
  };
  accounts.push(account);
  res.status(201).json({ account });
};

// PATCH ACCOUNT
const patchAccount = (req, res) => {
  let account = idValidation(req.params.id);
  if(!account) res.status(404).json({ error: 'Account not found' });
  account.status = req.body.status;
  res.status(200).json({ account });
};

// DELETE ACCOUNT FUNCTION
const deleteAccount = (req, res) => {
let data = idValidation(req.params.id);
  if(!data) res.status(404).json({ error: 'Account not found'});
  const dataIndex = accounts.indexOf(data);
  accounts.splice(dataIndex, 1);
  res.status(204).json({ message: 'Account has been deleted' });
};

module.exports = { getAccounts, getAccountById, postAccount, patchAccount, deleteAccount };
