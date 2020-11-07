var express = require('express');
var router = express.Router();

var csrf = require('csrf');
var tokens = new csrf();
const bcrypt = require('bcrypt');
import LibAuth from "../libs/LibAuth"
import LibCsrf from "../libs/LibCsrf"

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
        var user = LibAuth.get_user(req)
        var mail = null
        if(user != null){
            mail = user.mail
//            console.log(user.password );
        }
        res.render('index.ejs', { mail: mail });
    } catch (e) {
        console.log(e);
    }  
});
//
router.get('/about', function(req, res, next) {
  res.render('about', { title: ' '});
});
//
router.get('/userlist', function(req, res) {
});
/******************************** 
* 
*********************************/
router.get('/login', function(req, res) {
    LibCsrf.set_token(req, res) 
    res.render('login', { user : "" });
});
/******************************** 
* 
*********************************/
router.post('/login', function(req, res){
    try{
        if(LibCsrf.valid_token(req, res)== false){
            console.log("error, csrf token");
            res.redirect('/login')
        }
        var data = req.body
//        console.log(data )  
        let hashed_password = bcrypt.hashSync("1111", 10);
        if (data.email === "hoge@example.com" && bcrypt.compareSync(data.password,  hashed_password )) 
        {
//            console.log(hashed_password);    
            var user = {
                mail: data.email, password: hashed_password
            }
            var json = JSON.stringify( user );
            res.cookie('user', json );
            res.redirect('/')
        }else{
            console.log("error, login");
            res.clearCookie('user');
            res.redirect('/login')
        }        
    } catch (e) {
        console.log(e);
    }
});
/*
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
*/

module.exports = router;
