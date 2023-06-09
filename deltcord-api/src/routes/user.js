"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controllers/userController");
const express_1 = __importDefault(require("express"));
const userController_2 = require("../controllers/userController");
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const router = express_1.default.Router();
router.route("/").get(verifyAuth_1.default, userController_2.fetchUsers);
router.route("/profile").get(verifyAuth_1.default, userController_1.loggedInUser);
exports.default = router;
