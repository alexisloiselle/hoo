import { ActivityLevel } from "@prisma/client";

type User = {
  activityLevel: ActivityLevel;
  hydrationPercentage: number;
  weight: number;
};

type WithMl<T> = T extends null
  ? null
  : Omit<T, "hydrationPercentage"> & {
      goalMlPerDay: number;
      currentMlLevel: number;
    };

const mlPerActivityLevel = {
  [ActivityLevel.LOW]: 0,
  [ActivityLevel.MEDIUM]: 1000,
  [ActivityLevel.HIGH]: 2000,
};

// 100ml par 10lbs a partir de 125lbs
// 1.5l de base
// 1l par niveau d'activité
export const computeMl = <T extends User>(
  user: T | null
): WithMl<User | null> => {
  if (!user) {
    return null;
  }

  const goalMlPerDay = Number(
    (
      1500 +
      mlPerActivityLevel[user.activityLevel] +
      (100 * (user.weight - 125)) / 10
    ).toFixed(2)
  );

  return {
    ...user,
    goalMlPerDay: goalMlPerDay,
    currentMlLevel: (user.hydrationPercentage * goalMlPerDay) / 100,
    hydrationPercentage: undefined,
  };
};
