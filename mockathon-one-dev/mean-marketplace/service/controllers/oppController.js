var Opp = require('../models/opportunity');

module.exports.create = function(req, res) {
	var opp = new Opp(req.body);
	console.log(req.body);
	//var opp = new Opp({opNumber : "O2",opTitle : "Test Opp2",opType : "Opp Type2",createdBy : "mehulsoni@gmail.com",primaryContact : "Mehul Soni"});
	opp.save(function (err, result) {
		//res.json(result);
		var user = result.createdBy;
		console.log('Created user: ' + user);
		var list = Opp.find({createdBy: user}, function(err, results) {
			res.json(results);
		});
	});
}

module.exports.buyerlist = function(req, res) {
	var username = req.params.user;
	console.log('Username is :' + username)
	Opp.find({createdBy: username}, function(err, results) {
			res.json(results);
		});
}