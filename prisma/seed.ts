import { PrismaClient } from "@prisma/client";

// instantiate PrismaClient
const prisma = new PrismaClient();

async function main() {
  // Define seed data
  const users = [
    {
      id: "user1",
      name: "Alice",
      email: "alice@example.com",
      password: "password123",
      todos: {
        create: [
          {
            id: "todo1",
            title: "Buy groceries",
            completed: false,
          },
          {
            id: "todo2",
            title: "Read a book",
            completed: true,
          },
        ],
      },
    },
    {
      id: "user2",
      name: "Bob",
      email: "bob@example.com",
      password: "password123",
      todos: {
        create: [
          {
            id: "todo3",
            title: "Write code",
            completed: false,
          },
          {
            id: "todo4",
            title: "Go for a walk",
            completed: true,
          },
        ],
      },
    },
  ];

  // Insert seed data
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seed data inserted successfully");
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

  // Close PrismaClient
  .finally(async () => {
    await prisma.$disconnect();
  });