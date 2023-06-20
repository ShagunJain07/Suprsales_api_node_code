const admin_schema = require("../model/employee_master")


const get_data=async(req,res)=>{
      console.log("inside")
      const data_found=await admin_schema.find({EMP_ID:{$nin: ['samishti','p.samishti','c.samishti']}})
      res.send(data_found)
}

module.exports={
      get_data
}