const company_schema = require("../model/company_master")


const add_company=async(req,res)=>{
      const id=req.body.id
      const name=req.body.name

      const adding=await company_schema.insertMany({COMPANY_ID_ID:id,COMPANY_NAME:name})
      res.send(adding)
}

module.exports={
      add_company
}