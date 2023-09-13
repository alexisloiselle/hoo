import { PrismaClient } from "@prisma/client";
import CronJob from "node-cron";

export const initCronJobs = () => {
  const cron = CronJob.schedule("0,15,30,45 8-20 * * *", async () => {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany();

    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          hydrationPercentage: Math.min(
            100,
            Math.max(0, user.hydrationPercentage - 2)
          ),
        },
      });
    }

    await prisma.$disconnect();
  });

  cron.start();
};
