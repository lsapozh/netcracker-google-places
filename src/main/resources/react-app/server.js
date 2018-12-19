// var express = require('express');
// var path = require('path');
// var app = express();
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.get('*', function(req, res, next) {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   console.log(err)
//   res.status(500);
//   res.send(err.message);
// });
//
// app.listen(3000, function () {
//   console.log('App listening on port 3000!\n');
// });
