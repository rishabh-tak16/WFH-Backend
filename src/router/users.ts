import express from "express";
import LoginOrganizationUser from "../controllers/LoginOrganizationUser.controller";
import RegisterOrganizationUser from "../controllers/LoginOrganizationUser.controller";
import RegisterOrganization from "../controllers/RegisterOrganization.controller";
import RegisterSystemUser from "../controllers/RegisterSystemUser.controller";
import SendMail from "controllers/SendMailRequest.controller";
import LoginSystemUser from "../controllers/LoginSystemUser.controller";
import DashBoardSystemUser from "../controllers/DashBoardSystemUser.controller"
import DashBoardOrganizationUser from "../controllers/DashBoardOrganizationUser.controller";
import DeleteOrganizationUser from "../controllers/DeleteOrganizationUser.controller";
import WFHApplication from "../controllers/WFHApplication.controller";
import MakeAdmin from "../controllers/MakeAdmin.controller";
import GetAdmin from "../controllers/GetAdmin.controller";
import UpdateWFH_Application from "../controllers/UpdateWFHApplication.controller";
import Auth from "../middlewares/auth.middleware"

const router = express.Router();

// System User
router.post("/sysuser-register", RegisterSystemUser);
router.post("/sysuser-login", LoginSystemUser);
router.post("/sysuser-dashboard", Auth, DashBoardSystemUser);

// Organization Users
router.post("/user-login", LoginOrganizationUser);
router.post("/user-register", RegisterOrganizationUser);
router.post("/user-dashboard", Auth, DashBoardOrganizationUser);
router.post('/user-delete', DeleteOrganizationUser);

// Organization
router.post("/org-signup", RegisterOrganization);
router.post("/org-admin", MakeAdmin);
router.post("/org-getadmin", GetAdmin);

// Utility Route
// router.post("/mail", SendMail);
router.post('/application', Auth, WFHApplication);
router.post('/application-status', UpdateWFH_Application);

export default router;
