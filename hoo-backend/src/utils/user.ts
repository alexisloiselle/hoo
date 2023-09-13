import { ActivityLevel } from "@prisma/client";

type User = {
  activityLevel: ActivityLevel;
  hydrationPercentage: number;
  weight: number;
};

type WithLiters<T> = T extends null
  ? null
  : Omit<T, "hydrationPercentage"> & {
      goalLitersPerDay: number;
      currentLitersLevel: number;
    };

const litersPerActivityLevel = {
  [ActivityLevel.LOW]: 0,
  [ActivityLevel.MEDIUM]: 1,
  [ActivityLevel.HIGH]: 2,
};

// 100ml par 10lbs a partir de 125lbs
// 1.5l de base
// 1l par niveau d'activité
export const computeLiters = <T extends User>(
  user: T | null
): WithLiters<User | null> => {
  if (!user) {
    return null;
  }

  const goalLitersPerDay = Number(
    (
      1.5 +
      litersPerActivityLevel[user.activityLevel] +
      (0.1 * (user.weight - 125)) / 10
    ).toFixed(2)
  );

  return {
    ...user,
    goalLitersPerDay,
    currentLitersLevel: (user.hydrationPercentage * goalLitersPerDay) / 100,
    hydrationPercentage: undefined,
  };
};
