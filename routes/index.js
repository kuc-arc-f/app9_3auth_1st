var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
import LibAuth from "../libs/LibAuth"

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
  res.render('login', { user : req.user });
});
/******************************** 
* 
*********************************/
router.post('/login', function(req, res){
    try{
        var data = req.body
        if (data.username === "test" && data.password === "1111") {
            console.log(data )  
            let hashed_password = bcrypt.hashSync(data.password, 10);
            console.log(hashed_password);    
//            var c1 = bcrypt.compareSync(data.password,  hashed_password )
            var user = {
                mail: data.username, password: hashed_password
            }
            var json = JSON.stringify( user );
            res.cookie('user', json );
            res.redirect('/')
        }else{
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
