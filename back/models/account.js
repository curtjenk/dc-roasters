var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Account = new Schema({
  token: String,
  tokenExpiration: Date,
  username: String,
  password: String,
  email: String,
  frequency: String,
	quantity: String,
	grind: String,
	fullname: String,
	address: String,
	address2: String,
	city: String,
	state: String,
	zip: String,
	deliveryDate: String,
  createDate: Date,
  modifiedDate: Date

});

module.exports = mongoose.model('Account', Account, 'Account');
