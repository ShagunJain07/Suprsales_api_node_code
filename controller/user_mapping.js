const usermapping=require("../model/user_mapping")
const role=require("../model/role_master")
const auth=require("../model/authorization_master_tab")
const api_create=async(req,res)=>{
      const emp_id=req.body.EMP_ID
      const role_id=req.body.ROLE_ID

      for(i=0;i<=emp_id.length;i++){
            //console.log(emp_id[i],role_id[i])
            const insert_data=await usermapping.insertMany({EMP_ID:emp_id[i],ROLE_ID:role_id[i]})

      }
      res.send("inserted")
}

const all_roles=async(req,res)=>{
      const emp_id=req.query.EMP_ID
      
      const get_data=await usermapping.find({EMP_ID:emp_id},{_id:0,__v:0})
      const role_data=await role.find({ROLE_ID:get_data[0].ROLE_ID},{_id:0,__v:0})
      const roless={
            role_detail:[]
      }
      const final_data=[{
            FLAG: get_data[0].FLAG,
             EMP_ID: get_data[0].EMP_ID, 
             ROLE_ID: get_data[0].ROLE_ID,
             role_data:[]
      }]
      for(i=0;i<role_data.length;i++){
            final_data[0].role_data.push({"FLAG":role_data[i].FLAG,
            "ROLE_ID": role_data[i].ROLE_ID,
            "ROLE_NAME": role_data[i].ROLE_NAME,
            "ROLE_DESCRIPTION":role_data[i].ROLE_DESCRIPTION,
            "AUTH_ID":role_data[i].AUTH_ID,
           "auth_detail":[]})
            const auth_data=await auth.find({AUTH_ID:role_data[i].AUTH_ID})
           // console.log(auth_data[0])
            final_data[0].role_data[i].auth_detail.push(auth_data[0])
      }
     
     res.send(final_data)

      
}
module.exports={
      api_create,all_roles
}