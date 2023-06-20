const employee_master=require("../model/employee_master")
const axios = require('axios');

const create_emp=async(req,res)=>{
      console.log("create_employee")
      let data = JSON.stringify({
            "DT_FROM": "2017-04-01",
            "DT_TO": "2023-05-30"
      });

      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.204/api/GetData/GetEmployeeMaster?FROMDATE=2017-04-01&TODATE=2023-05-30',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic VmVuZG9yUG9ydGFsOlZtVnVaRzl5'
            },
            data: data
      };
      const sendingdata =
            axios.request(config)
                  .then((response) => {
                        let data = response.data.Data
                        // res.send(data)
                        data.map(async (items, index) => {
                               console.log(items)
                              const new_detail =await employee_master.insertMany({...items,...{PASSWORD:123456}})
                        })
                        res.send("data inserted")

                  })
                  .catch((error) => {
                        console.log(error);
                  });

}

const employee_login=async(req,res)=>{
      const id=req.query.id
      const password=req.query.password
      if(id==null||password==null){
            res.send("please enter id and password")}
      else{
      const employee_data=await employee_master.find({EMP_ID:id,PASSWORD:password})
       res.send(employee_data)
}
}
module.exports={
      create_emp,employee_login
}