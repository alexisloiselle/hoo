import { PrismaClient } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import express from "express";

import { computeMl } from "./utils/user";
import { initCronJobs } from "./cron-jobs";
import { GptService } from "./services/gpt";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}\n${JSON.stringify(req.body)}\n`);
  next();
});

app.post("/users", async (req, res) => {
  try {
    const { activityLevel, age, gender, region, username, weight } = req.body;

    const user = await prisma.user.create({
      data: {
        activityLevel,
        age,
        gender,
        region,
        username,
        weight,
      },
    });
    return res.json(computeMl(user));
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const users = await prisma.user.findMany();

    const currentUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!currentUser) {
      return res.json(null);
    }

    const numberOfPeopleBetterThanU = users.reduce((acc, user) => {
      if (user.id !== currentUser.id && user.score > currentUser.score) {
        return acc + 1;
      }

      return acc;
    }, 0);

    res.json({
      ...computeMl(currentUser),
      percentile: Number(
        ((numberOfPeopleBetterThanU / users.length) * 100 + 1).toFixed(0)
      ),
    });
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.patch("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { activityLevel, age, gender, region, weight } = req.body;

    const user = await prisma.user.update({
      where: { username },
      data: { activityLevel, age, gender, region, weight },
    });

    res.json(computeMl(user));
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/users/:username/hydration", async (req, res) => {
  try {
    const { username } = req.params;
    const { hydrationPercentage: sentHydrationPercentage } = req.body;

    const hydrationPercentage = Math.min(
      100,
      Math.max(0, sentHydrationPercentage)
    );

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).send();
    }

    const newScore =
      user.score + Math.max(0, hydrationPercentage - user.hydrationPercentage);

    await prisma.user.update({
      where: { username },
      data: {
        hydrationPercentage,
        score: newScore,
      },
    });

    res.status(204).send();
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;

    await prisma.user.delete({
      where: { username },
    });

    res.status(204).send();
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/users/:username/leaderboard", async (req, res) => {
  try {
    const { username } = req.params;

    const users = await prisma.user.findMany({
      orderBy: { score: "desc" },
    });

    const meIndex = users.findIndex((user) => user.username === username);

    const numberOfPeopleBetterThanU = users.reduce((acc, user) => {
      if (user.id !== users[meIndex].id && user.score > users[meIndex].score) {
        return acc + 1;
      }

      return acc;
    }, 0);

    res.json({
      best: users.slice(0, 5).map((user, index) => ({
        ...computeMl(user),
        position: index + 1,
      })),
      me: {
        ...computeMl(users[meIndex]),
        position: meIndex + 1,
        percentile: Number(
          ((numberOfPeopleBetterThanU / users.length) * 100 + 1).toFixed(0)
        ),
      },
    });
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/users/:username/bio", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).send();
    }

    let thirstLevel = "He is not thirsty.";
    if (user.hydrationPercentage === 0) {
      thirstLevel = "He is completely dehydrated.";
    } else if (user.hydrationPercentage < 10) {
      thirstLevel = "He is very thirsty.";
    } else if (user.hydrationPercentage < 20) {
      thirstLevel = "He is thirsty.";
    } else if (user.hydrationPercentage < 50) {
      thirstLevel = "He is a bit thirsty.";
    }

    const bio = await GptService.prompt(
      `
      Write a short biography for ${username}:
      
      This person is ${user.age} years old.
      He considers his activity level to be ${user.activityLevel}.
      He weighs ${user.weight} pounds.
      He lives in ${user.region}.
      He considers his gender to be ${user.gender}.
      ${thirstLevel}
    `,
      "long"
    );

    res.json({
      username,
      bio,
    });
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/token/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { username } = req.body;

    await prisma.user.update({
      where: { username },
      data: { token },
    });

    res.status(204).send();
  } catch (e) {
    console.error(e);

    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/qotd", async (_req, res) => {
  try {
    const qotd = await GptService.prompt(
      "Generate a short motivational quote of the to encourage drinking water.",
      "long"
    );
    res.json({ qotd });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

initCronJobs();

const server = app.listen(3000, () =>
  console.log("🚀 Server ready at: http://localhost:3000")
);
