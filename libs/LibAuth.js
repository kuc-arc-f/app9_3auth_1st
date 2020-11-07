// LibAuth

//
export default {
    get_user:function(req){
        var ret = [];
        var user_json = req.cookies.user;
        var user = null
        if(user_json != null ){
          user = JSON.parse(user_json || '[]')
//          console.log(user_json);
//          console.log(user.password );
        }        
        return user;        
    },
    valid_user:function(req){
        var ret = false;
        var user_json = req.cookies.user;
        if(user_json != null ){
            ret = true;
        }          
        return ret;
    }   

}