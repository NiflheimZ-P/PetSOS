const { PrismaClient } = require("../lib/generated/prisma");
const prismaLib = require("../lib/generated/prisma");
const Role = prismaLib.Role;
const PostType = prismaLib.PostType;

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Create users
  const admin = await prisma.user.create({
    data: {
      first_name: "Alice",
      last_name: "Admin",
      username: "alice_admin",
      email: "alice@example.com",
      password: "hashedpassword123", // in real apps, always hash!
      role: Role.ADMIN,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      first_name: "Bob",
      last_name: "Builder",
      username: "bob_builder",
      email: "bob@example.com",
      password: "password123",
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      first_name: "Charlie",
      last_name: "Commenter",
      username: "charlie_comment",
      email: "charlie@example.com",
      password: "password456",
      role: Role.USER,
    },
  });

  // 2️⃣ Create posts
  const post1 = await prisma.posts.create({
    data: {
      post_owner: user1.id,
      type: PostType.TEXT,
      detail: "Hello everyone! My first post 🚀",
      status: "public",
    },
  });

  const post2 = await prisma.posts.create({
    data: {
      post_owner: admin.id,
      type: PostType.IMAGE,
      detail: "Beautiful sunset today 🌅",
      image_url: "https://example.com/sunset.jpg",
      status: "public",
    },
  });

  // 3️⃣ Create comments
  await prisma.post_comments.createMany({
    data: [
      {
        post_id: post1.post_id,
        comment_owner: user2.id,
        comment: "Nice post!",
      },
      {
        post_id: post1.post_id,
        comment_owner: admin.id,
        comment: "Welcome to the platform 😄",
      },
      {
        post_id: post2.post_id,
        comment_owner: user1.id,
        comment: "Wow! That sunset is amazing 🔥",
      },
    ],
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
