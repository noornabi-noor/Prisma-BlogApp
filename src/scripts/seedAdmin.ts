import { prisma } from "../lib/prisma";
import { UserRoles } from "../middleware/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: process.env.ADMIN_NAME as string,
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASSWORD as string,
    };

    // check user if already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      console.log("Admin already exists!");
      return;
    }

    // Step 1: Sign up via Better Auth
    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:5000",
        },
        body: JSON.stringify(adminData),
      }
    );

    const result = await signUpAdmin.json();
    console.log("Sign-up result:", result);

    // Step 2: Promote to ADMIN + mark verified
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          role: UserRoles.ADMIN,
          emailVerified: true,
        },
      });
      console.log("Admin promoted successfully!");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}

seedAdmin();
