const router = require("express").Router();

const controller=require("../controller/user_mapping")

router.post("/api_create", controller.api_create);
router.get("/all_roles",controller.all_roles)
module.exports=router
