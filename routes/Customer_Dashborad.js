const router = require("express").Router();

const controller=require("../controller/customer_Dashboard")

 router.get("/getAgingByCustId", controller.getAgingByCustId);
 router.post("/add_balance",controller.add_balance)
 router.get("/getCustomerByCustId",controller.getCustomerByCustId)
router.post("/add_data",controller.invoice_data)
router.get("/currentVsLastSales",controller.currentVsLastSales)

router.get("/graph_product",controller.graph_product)
router.get("/salesBySkuCategory",controller.salesBySkuCategory)
router.get("/skuBySkuCategory",controller.skuBySkuCategory)
router.get("/topmost_product",controller.topmost_product)
router.get("/getAllSkuCatgory",controller.getAllSkuCatgory)
router.get("/getCustomerDetailById",controller.getCustomerDetailById)
router.get("/getLedgerByCustId",controller.getLedgerByCustId)
 module.exports=router
