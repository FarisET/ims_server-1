var mysql= require('mysql');
var con =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'test1'
})


con.connect(function(error){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('Connected');
    }
});

module.exports=con;