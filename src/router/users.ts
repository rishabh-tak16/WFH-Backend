import express from "express";
import LoginOrganizationUser from "../controllers/loginOrganizationUser.controller";
import RegisterOrganizationUser from "../controllers/registerOrganizationUser.controller";
import RegisterOrganization from "../controllers/registerOrganization.controller";
import RegisterSystemUser from "../controllers/registerSystemUser.controller";
import SendMail from "controllers/sendMailRequest.controller";
import LoginSystemUser from "../controllers/loginSystemUser.controller";
import DashBoardSystemUser from "../controllers/dashBoardSystemUser.controller"
import DashBoardOrganizationUser from "../controllers/dashBoardOrganizationUser.controller";
import DeleteOrganizationUser from "../controllers/deleteOrganizationUser.controller";
import WFHApplication from "../controllers/wfhApplication.controller";
import MakeAdmin from "../controllers/makeAdmin.controller";
import GetAdmin from "../controllers/getAdmin.controller";
import UpdateWFH_Application from "../controllers/updateWFHApplication.controller";
import Auth from "../middlewares/auth.middleware"

const router = express.Router();

// System User
router.post("/sysuser-register", RegisterSystemUser);
router.post("/sysuser-login", LoginSystemUser);
router.post("/sysuser-dashboard", DashBoardSystemUser);

// Organization Users
router.post("/orguser-login", LoginOrganizationUser);
router.post("/orguser-register", RegisterOrganizationUser);
router.post("/orguser-dashboard", Auth, DashBoardOrganizationUser);
router.post('/orguser-delete', DeleteOrganizationUser);

// Organization
router.post("/org-register", RegisterOrganization);
router.post("/org-admin", MakeAdmin);
router.post("/org-getadmin", GetAdmin);

// Utility Route
//router.post("/mail", SendMail);
router.post('/application', Auth, WFHApplication);
router.post('/application-status', UpdateWFH_Application);

export default router;
