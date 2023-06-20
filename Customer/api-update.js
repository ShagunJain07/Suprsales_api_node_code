const farmer_schema=require('../model/farmer_master')

const retailer_schema=require('../model/retailer_master')

const update_data=async(req,res)=>{
      const cust_id=req.query.id
      const TYPE_CODE=req.query.code
      const CUST_NAME=req.body.CUST_NAME
      const CUST_BANK_ACCOUNT=req.body.CUST_BANK_ACCOUNT
      const CUST_MOB=req.body.CUST_MOB
      const FLAG=req.body.FLAG
//console.log(TYPE_CODE)
      if(TYPE_CODE==='FAR'){
            console.log("farmer")
            const query=await farmer_schema.findOneAndUpdate({FARMER_ID:cust_id},{$set:{FARMER_NAME:CUST_NAME,FARMER_BANK_ACC_NO:CUST_BANK_ACCOUNT,FARMER_MOB:CUST_MOB,FLAG:FLAG}})
            res.send(await farmer_schema.find({FARMER_ID:cust_id}))
      }

       if(TYPE_CODE==='RET'){
            // console.log("retailer")
            const query_data=await retailer_schema.findOneAndUpdate({RETAILER_ID:cust_id},{$set:{RETAILER_NAME:CUST_NAME,RETAILER_BANK_ACC_NO:CUST_BANK_ACCOUNT,RETAILER_MOB:CUST_MOB,FLAG:FLAG}}, function (error, result) {

            })
            // console.log(cust_id)
            res.send(await retailer_schema.find({RETAILER_ID:cust_id}))
      }
}
      
      module.exports={
            update_data
      }