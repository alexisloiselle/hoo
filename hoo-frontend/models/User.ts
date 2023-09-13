interface User {
  id: number;
  username: string;
  age: number;
  weight: number;
  activityLevel: string;
  gender: string;
  region: string;
  score: number;
  character: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  goalMlPerDay: number;
  currentMlLevel: number;
  percentile: number;
  position?: number;
}

export default User;
