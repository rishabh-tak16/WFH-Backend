import express from "express";
import LoginOrganizationUser from "../controllers/loginOrganizationUser.controller";
import RegisterOrganizationUser from "../controllers/registerOrganizationUser.controller";
import RegisterOrganization from "../controllers/registerOrganization.controller";
// import RegisterSystemUser from "../controllers/registerSystemUser.controller";
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
// import getAllApplication from "../controllers/getAllApplication.controller";
import getUserAllApplication from "../controllers/getUserAllApplication.controller";
import GetAllOrganizations from "../controllers/getAllOrganization.controller";
import UpdateOrganization from "../controllers/updateOrganization.controller";
import DeleteOrganization from "../controllers/deleteOrganization.controller";
import getAllApplicationFiltered from '../controllers/getApplicationFiltered.controller'
import GetOrganization from '../controllers/GetOrganization.controller'

const router = express.Router();

// System User
// router.post("/sysuser-register", RegisterSystemUser);
router.get("/sysuser-login", LoginSystemUser);
router.get("/sysuser-dashboard",DashBoardSystemUser);

// Organization Users
router.get("/orguser-login", LoginOrganizationUser);
router.post("/orguser-register", RegisterOrganizationUser);
router.get("/orguser-dashboard", DashBoardOrganizationUser);
router.post('/orguser-delete', DeleteOrganizationUser);
router.get("/admin",CheckAdmin);

// Organization
router.post("/org-register", RegisterOrganization);
router.post("/org-admin", MakeAdmin);
router.post("/find-user",FindUserByEmail);
router.get("/organization",GetAllOrganizations);
router.put('/update-org', UpdateOrganization);
router.put('/delete-org', DeleteOrganization);
router.get('/organization/data', GetOrganization)

// Utility Route
router.get("/mail/:email", SendMail);
router.post('/application', WFHApplication);
router.put('/application/status', UpdateWFH_Application);
// router.post("/all-application",getAllApplication);
router.get("/all-application/:orgName/filter",getAllApplicationFiltered);
router.get("/user-applications",getUserAllApplication);


export default router;
