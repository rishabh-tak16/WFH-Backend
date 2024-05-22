import express from "express";
import LoginOrganizationUser from "../controllers/loginOrganizationUser.controller";
import RegisterOrganizationUser from "../controllers/registerOrganizationUser.controller";
import RegisterOrganization from "../controllers/registerOrganization.controller";
import RegisterSystemUser from "../controllers/registerSystemUser.controller";
import SendMail from "../controllers/sendMail.controller";
import LoginSystemUser from "../controllers/loginSystemUser.controller";
import DashBoardSystemUser from "../controllers/dashBoardSystemUser.controller"
import DashBoardOrganizationUser from "../controllers/dashBoardOrganizationUser.controller";
import DeleteOrganizationUser from "../controllers/deleteOrganizationUser.controller";
import WFHApplication from "../controllers/wfhApplication.controller";
import MakeAdmin from "../controllers/makeAdmin.controller";
import UpdateWFH_Application from "../controllers/updateWFHApplication.controller";
import Auth from "../middlewares/auth.middleware"
import FindUserByEmail from "../controllers/findUserByEmail.controller";
import CheckAdmin from "../controllers/checkAdmin.controller";
import getAllApplication from "../controllers/getAllApplication.controller";
import getUserAllApplication from "../controllers/getUserAllApplication.controller";
import GetAllOrganizations from "../controllers/getAllOrganization.controller";
import UpdateOrganization from "../controllers/updateOrganization.controller";

const router = express.Router();

// System User
router.post("/sysuser-register", RegisterSystemUser);
router.post("/sysuser-login", LoginSystemUser);
router.post("/sysuser-dashboard",Auth, DashBoardSystemUser);

// Organization Users
router.post("/orguser-login", LoginOrganizationUser);
router.post("/orguser-register", RegisterOrganizationUser);
router.post("/orguser-dashboard", Auth, DashBoardOrganizationUser);
router.post('/orguser-delete', DeleteOrganizationUser);
router.post("/admin",CheckAdmin);

// Organization
router.post("/org-register", RegisterOrganization);
router.post("/org-admin", MakeAdmin);
router.post("/find-user",FindUserByEmail);

// Utility Route
router.get("/mail/:email", SendMail);
router.post('/application', WFHApplication);
router.put('/application/status', UpdateWFH_Application);
router.post("/all-application",getAllApplication);
router.post("/user-application",getUserAllApplication);

//Organization
router.get("/organization",GetAllOrganizations);
router.put('/update-org', UpdateOrganization);

export default router;
