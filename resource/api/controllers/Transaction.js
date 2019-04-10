const Joi = require('joi');
// DUMMY DATA
const transactions = require('./../model/transaction');

// VALIDATION OF DATA
const transValildation = (data) => {
  const schema = {
    type: Joi.string().required(),
    accountNumber: Joi.number().min(8).required(),
    cashier: Joi.number().required(),
    amount: Joi.number().required(),
    oldBalance: Joi.number().required(),
    newBalance: Joi.number().required(),
  };
  return Joi.validate(data, schema);
};
const idValidation = (id) => {
  return transactions.find ( trans => trans.id === parseInt (id));
};
const accValidation = (accountNumber) => {
  return transactions.filter ( trans => trans.accountNumber === parseInt (accountNumber));
};

// GET TRANSACTIONS
const getTrans = (req, res) =>{
  res.status(200).json({
    data: transactions,
  });
};

// GET TRANSACTIONI BY ID
const getTransById = (req, res) => {
  const data = idValidation(req.params.id);
  if (!data) res.status(404).json({ error: 'Transaction not found' });
  res.status(200).json({
    data: data,
  });
};
const getTransByAccount = (req, res) => {
  console.log(req.params.accountNumber);
  const trans = accValidation(req.params.accountNumber);
  if (!trans) return res.status(404).json({ error: 'Account not found' });
  res.status(200).json({
    data: trans,
  });
};


// POST TRANSACTION
const postTrans = (req, res) => {
  const result = transValildation(req.body);
  if (result.error) return res.status(404).json({ error: result.error.details[0].message});
  const trans = {
    id: transactions.length + 1,
    createdOn: new Date(),
    type: req.body.type,
    accountNumber: req.body.accountNumber,
    cashier: req.body.cashier,
    amount: req.body.amount,
    oldBalance: req.body.oldBalance,
    newBalance: req.body.newBalance,
  };
  transactions.push(trans);
  res.status(201).json({ trans });
};

// DELETE TRANSACTION
const deleteTrans = (req, res) => {
let data = idValidation(req.params.id);
  if(!data) res.status(404).json({ error: 'Transaction not found'});
  const dataIndex = transactions.indexOf(data);
  transactions.splice(dataIndex, 1);
  res.status(204).json({ message: 'Transaction has been deleted' });
};

module.exports = { getTrans, getTransById, getTransByAccount, postTrans, deleteTrans };
