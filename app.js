const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var Email=req.body.email;

    var data={
        members:[
            {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }

        }
    ]
    };
    var JSONdata=JSON.stringify(data);

    var url="https://us1.api.mailchimp.com/3.0/lists/a739ca620c";

    const options={
        method:"post",
        
        auth:"sanket:116daaf91801dfdac11ce0b3626d41db-us1"
        

    }


    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));

        })

    })

    request.write(JSONdata);
    request.end();

    
});

app.post("/failure",function(req,res){
    res.redirect("/");
})





app.listen(process.env.PORT || 3000,function(){
    console.log("server started");

})

//116daaf91801dfdac11ce0b3626d41db-us1
//a739ca620c
