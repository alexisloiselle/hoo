import { PrismaClient } from "@prisma/client";
import CronJob from "node-cron";
import { Message, NotificationsService } from "../services/notifications";

export const initCronJobs = () => {
  const cron = CronJob.schedule("0,15,30,45,59 8-20 * * *", async () => {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany();

    let messages: Message[] = [];
    for (const user of users) {
      const newHydrationPercentage = Math.min(
        100,
        Math.max(0, user.hydrationPercentage - 2)
      );

      if (user.token) {
        if (user.hydrationPercentage > 10 && newHydrationPercentage <= 10) {
          messages.push({
            to: user.token,
            body: "You're almost out of water in your body!",
            title: "HEY! DRINK SOME WATER!",
          });
        }

        if (user.hydrationPercentage > 0 && newHydrationPercentage <= 0) {
          messages.push({
            to: user.token,
            body: "You're out of water in your body!",
            title: "HEY! DRINK SOME WATER!",
          });
        }
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          hydrationPercentage: newHydrationPercentage,
        },
      });
    }
    await prisma.$disconnect();
    await NotificationsService.sendNotifications(messages);
  });

  cron.start();
};
