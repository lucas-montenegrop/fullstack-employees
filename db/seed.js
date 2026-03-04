import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

const employees = [
  { name: "Test 1", birthday: new Date("1990-01-01"), salary: 75000 },
  { name: "Test 2", birthday: new Date("1992-02-02"), salary: 80000 },
  { name: "Test 3", birthday: new Date("1994-03-03"), salary: 90000 },
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