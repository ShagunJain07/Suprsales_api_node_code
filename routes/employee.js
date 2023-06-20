const router = require("express").Router();

const controller=require("../controller/Employee")

router.post("/create-employee", controller.create_emp);
router.get("/emp_login",controller.employee_login)

// router.get("/get",controller.get_data)
// router.get("/login",controller.login)

module.exports=router
