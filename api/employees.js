import express from "express";
const router = express.Router();

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

export default router;

/* =========================
   GET /employees
   ========================= */

// when client asks for all employees
// get all employees from database
// send them back
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (err) {
    next(err);
  }
});

/* =========================
   POST /employees
   ========================= */

// read request body
// if body missing -> send 400
// if any required field missing -> send 400
// otherwise create employee
// send new employee with status 201
router.post("/", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("Request body required.");
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || salary === undefined) {
      return res.status(400).send("Missing required field.");
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  } catch (err) {
    next(err);
  }
});

/* =========================
   GET /employees/:id
   ========================= */

// get id from URL params
// look up employee by id
// if not found -> send 404
// otherwise send employee
router.get("/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);

    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    res.send(employee);
  } catch (err) {
    next(err);
  }
});

/* =========================
   DELETE /employees/:id
   ========================= */

// get id from URL params
// try to delete employee
// if employee not found -> send 404
// if deleted successfully -> send 204 with no content
router.delete("/:id", async (req, res, next) => {
  try {
    const employee = await deleteEmployee(req.params.id);

    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

/* =========================
   PUT /employees/:id
   ========================= */

// get id from URL params
// check if body exists
// if body missing -> send 400
// get fields from body
// if any required field missing -> send 400
// update employee in database
// if employee not found -> send 404
// otherwise send updated employee with 200
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("Request body required.");
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || salary === undefined) {
      return res.status(400).send("Missing required field.");
    }

    const employee = await updateEmployee({
      id: req.params.id,
      name,
      birthday,
      salary,
    });

    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    res.status(200).send(employee);
  } catch (err) {
    next(err);
  }
});