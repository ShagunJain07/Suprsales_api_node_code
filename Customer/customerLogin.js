const distributor_schema=require("../model/distributor_master")

const login=async(req,res)=>{
      const DISTRIBUTOR_ID=req.body.DISTRIBUTOR_ID
      const PASSWORD=req.body.PASSWORD

      const data=await distributor_schema.find({DISTRIBUTOR_ID:DISTRIBUTOR_ID})
      if(data.PASSWORD==PASSWORD){
         res.send(data)
      }
      else{
           res.status(400).send("no user found")
      }
      
}

module.exports={
      login
}