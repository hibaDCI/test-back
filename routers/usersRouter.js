import {Router} from "express";

import {
  deleteUser,
  getAllUsers,
  login,
  register,
  updateUser,
} from "../controllers/userControllers.js";
import {
  userRegisterValidation,
  userValidationsTest,
} from "../middleware/validation.js";
import { auth } from "../middleware/authorization.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();
// "/api/users"
router.post("/login", login);
router.post("/register", userRegisterValidation, register);

// router.post("/validation", userValidationsTest);

router.patch("/update/:id",auth,isAdmin, updateUser);
router.delete("/delete/:id",auth,isAdmin,  deleteUser);
router.get("/allUsers",auth, isAdmin, getAllUsers);
router.get("/verifytoken", auth, (req,res)=>{
  res.send({success:true, data:req.user})
} )

export default router;
