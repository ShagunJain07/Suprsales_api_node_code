const router = require("express").Router();

const controller=require("../controller/company_master")

router.post("/create-company", controller.add_company);
// router.get("/get",controller.get_data)
// router.get("/login",controller.login)

module.exports=router
