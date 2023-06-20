const retailer_schema=require('../model/retailer_master')

const create_retailer=async(req,res)=>{
      let data = JSON.stringify({
            "DT_FROM": "2023-02-06",
            "DT_TO": "2023-02-06"
      });

      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.204/api/GetData/GetCustomerMaster?FROMDATE=2018-03-26&TODATE=2023-03-26',
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
                  data.map(async (items, index) => {
                        const new_detail = new retailer_schema({...items,...{PASSWORD:"123456"}})
                          new_detail.save((respond, err) => {
                        
                        })
                  })
                  res.send("data inserted")
                  
            })
            .catch((error) => {
                  console.log(error);
            });
}

module.exports={
      create_retailer
}