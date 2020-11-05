var express = require('express');
var router = express.Router();

import LibAuth from "../libs/LibAuth"

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/test1', function(req, res, next) {
    try{ 
        var v = LibAuth.valid_user(req);
        if(v){
            res.send("User, Login");
        }else{
            res.redirect('/login')
        }
        console.log(v);    
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;

