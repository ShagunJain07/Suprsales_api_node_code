const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const cors = require('cors')
 mongoose.set('strictQuery', false);

const url = 'mongodb://0.0.0.0:27017/suprsales_db_prd';
  
// Name of the database
// const dbname = "suprsales_db_prd";
  
mongoose.connect(url, (err,client)=>{
    if(!err) {
        console.log("successful connection with the server");  
    }
    else
        console.log("Error in the connectivity");
})
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
const customer = require("./routes/customer");
var d = new Date(); // Today!
      d.setDate(d.getDate() - 1); // Yesterday!
      var date_to_send=d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()
      var body = {
            GRN_FROM: date_to_send,
            GRN_TO:date_to_send
      }
      console.log(body)
const admin=require("./routes/admin")
const authorization=require("./routes/authorization")
const role=require("./routes/role")
const employee=require("./routes/employee")
const usermapping=require("./routes/user_mapping")
const Customer_order=require("./routes/CustomerOrder")
const Level=require("./routes/level")
const Claim=require("./routes/Claim")
const ledger=require("./routes/ledger")
app.use("/suprsales_api/Ledger",ledger)

app.use("/suprsales_api/Level",Level)
app.use("/suprsales_api/Employee",employee)
app.use("/suprsales_api/UserMapping",usermapping)
app.use("/suprsales_api/Claim",Claim)
const customer_dashboard=require("./routes/Customer_Dashborad")
app.use("/suprsales_api/Customer_Dashboard",customer_dashboard)
app.use("/suprsales_api/customerOrder",Customer_order)
app.use("/suprsales_api/authorization",authorization)
app.use("/suprsales_api/Role",role)
app.use("/suprsales_api/Admin",admin)
app.use("/suprsales_api/Customer",customer)
app.listen(5000, () => console.log("server up and runing on port 5000!"));
