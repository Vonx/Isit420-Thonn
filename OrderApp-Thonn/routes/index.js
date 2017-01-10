var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'OrderApp-Thonn' });
});

router.get('/orders', function(req, res) {
    var db = req.db;
    var collection = db.get('ordercollection');
    collection.find({},{},function(e,docs){
        res.render('orders', {
            "orders" : docs
        });
    });
});

var count = 0;

router.post('/addorder', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes

    // Set our collection
    var collection = db.get('ordercollection');

        // Submit to the DB
        collection.insert({
            "storeNumber": req.body.storeNumber,
            "salesPersonID": req.body.salesPersonID,
            "itemNumber": req.body.itemNumber,
            "timePurch": req.body.timePurch,
            "pricePaid": req.body.pricePaid
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send({
                    result: 'There was a problem inserting a record into the database'
                });}
            else {
                // And forward to success page
                /*res.send({
                    'Result': 'Success'
                });*/
                res.send({
                    result: 'success'
                });

            }
        });// end loop
   // res.redirect('/');
});

/*
router.get('/addorder', function(req, res, next) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes

    // Set our collection
    var collection = db.get('ordercollection');

    // Submit to the DB
    collection.insert({
        "storeNumber": req.query.storeNumber,
        "salesPersonID": req.query.salesPersonID,
        "itemNumber": req.query.itemNumber,
        "timePurch": req.query.timePurch,
        "pricePaid": req.query.pricePaid
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send({
                result: 'There was a problem inserting a record into the database'
            });}
        else {
            // And forward to success page
            /*res.send({
             'Result': 'Success'
             });
            count= count +1;
            console.log('Successfully inserted record: ' + count);
            res.send({
                result: 'success'
            });

        }
    });// end loop
    // res.redirect('/');
});
*/

module.exports = router;
