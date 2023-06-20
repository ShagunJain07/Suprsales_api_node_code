const ledger_master=require("../model/ledger_master")


const createLedger=async(req,res)=>{
      
}
const openingBalance=async(req,res)=>{
      const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  //  console.log(start_date)
  //  console.log(end_date)
  const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
    $gte:  start_date,
    $lte:  end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)
     
    res.send(ledger_data)

}

const viewLedgerMob=async(req,res)=>{
  const customer_id=req.query.id
  const current_year=new Date().getFullYear();

  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
    $gte:  start_date,
    $lte:  end_date}})
    res.send(ledger_data)
}

const viewLedgerCustomer=async(req,res)=>{
  const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  const last_start_date=new Date((current_year-1)+'-04-01')
  const last_end_date=new Date(current_year+'-03-31')
  const ledger_closing_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
    $gte:  start_date,
    $lte:  end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)

    const ledger_opening_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
      $gte:  last_start_date,
      $lte:  last_end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)
      
      const ledger_balance=[{
        CUSTOMER_ID:ledger_closing_balance[0].CUSTOMER_ID,
        CUSTOMER_NAME:ledger_closing_balance[0].CUSTOMER_NAME,
        CLOSING_BALANCE:ledger_closing_balance[0].BALANCE,
        OPENING_BALANCE:ledger_opening_balance[0].BALANCE,
        LEDGER_DETAIL:[]

      }]
      const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
        $gte:  start_date,
        $lte:  end_date}})
        //console.log(ledger_data.length)
        for(i=0;i<ledger_data.length;i++){
          ledger_balance[0].LEDGER_DETAIL.push(ledger_data[i])
        }
res.send(ledger_balance)
}
module.exports={
  openingBalance,viewLedgerMob,viewLedgerCustomer
}