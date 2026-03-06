import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

const employees = [
  { name: "Test 1", birthday: new Date("1990-01-01"), salary: 75000 },
  { name: "Test 2", birthday: new Date("1992-02-02"), salary: 80000 },
  { name: "Test 3", birthday: new Date("1994-03-03"), salary: 90000 },
  { name: "Test 4", birthday: new Date("1996-04-04"), salary: 85000 },
  { name: "Test 5", birthday: new Date("1991-05-05"), salary: 78000 },
  { name: "Test 6", birthday: new Date("1989-06-06"), salary: 92000 },
  { name: "Test 7", birthday: new Date("1993-07-07"), salary: 88000 },
  { name: "Test 8", birthday: new Date("1995-08-08"), salary: 81000 },
  { name: "Test 9", birthday: new Date("1997-09-09"), salary: 87000 },
  { name: "Test 10", birthday: new Date("1998-10-10"), salary: 93000 },
];

async function seedEmployee(employee) {
  return await createEmployee(employee);
}

async function seedEmployees() {
  for (const employee of employees) {
    await seedEmployee(employee);
  }
}

// ✅ run AFTER everything is defined
await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");