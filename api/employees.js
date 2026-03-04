import express from "express";
const router = express.Router();
export default router;

// TODO: this file! functions of the app

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";