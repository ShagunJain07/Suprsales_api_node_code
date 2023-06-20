const customer_order_master=require("../model/customer_order_master")
const customer_order_detail=require("../model/customer_order_detail")
const emp_customer_mapping=require("../model/emp_customer_mapping")


const create_order=async(req,res)=>{
     const CUSTOMER_ID=req.body.CUSTOMER_ID
     const TOTAL_ORDER_VALUE=req.body.TOTAL_ORDER_VALUE
     const SKU_ID=req.body.SKU_ID
     const SKU_QUANTITY=req.body.SKU_QUANTITY
     const TOTAL_SKU_VALUE=req.body.TOTAL_SKU_VALUE

     const approved_by=await emp_customer_mapping.find({CUSTOMER_ID:CUSTOMER_ID})
     const approved_by_id=approved_by[0].EMP_ID
     const order_master_count=await customer_order_master.countDocuments({})
     const count=order_master_count+1
     const customer_order_master_data=await customer_order_master.insertMany({ORDER_ID:count,APPROVED_BY:approved_by_id,CUSTOMER_ID:CUSTOMER_ID,TOTAL_ORDER_VALUE:TOTAL_ORDER_VALUE,APPROVE_STATUS:2,STATUS:1})

     for(i=0;i<SKU_ID.length;i++){
      const customer_order_detail_data=await customer_order_detail.insertMany({ORDER_ID:count,SKU_ID:SKU_ID[i],SKU_QUANTITY:SKU_QUANTITY[i],TOTAL_SKU_VALUE:TOTAL_SKU_VALUE[i],STATUS:3})
     }
     res.send("inserted")
}

module.exports={
      create_order
}