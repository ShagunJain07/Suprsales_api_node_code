const router = require("express").Router();

const controller=require("../controller/admin")

router.get("/index", controller.get_data);
// router.get("/get",controller.get_data)
// router.get("/login",controller.login)

module.exports=router
