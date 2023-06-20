const router = require("express").Router();

const controller=require("../controller/CustomerOrder")

router.post("/createOrder",controller.create_order);
// router.get("/get",controller.get_data)
// router.get("/login",controller.login)

module.exports=router
