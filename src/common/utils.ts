export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export function generateTeamsIds(amount: number) {
  const teamsIds: number[] = []

  for (let i = 1; i <= amount; i += 1) {
    teamsIds.push(i);
  }

  return teamsIds;
}

export function randomizeArray<T>(arr: T[]): T[] {
  const randomizedArr = [...arr];

  const arrSize = randomizedArr.length;
  for (let i = 0; i < arrSize; i += 1) {
    const randomIdx = Math.round(Math.random() * (arrSize - 1));
    const tmp = randomizedArr[i];
    randomizedArr[i] = randomizedArr[randomIdx];
    randomizedArr[randomIdx] = tmp;
  }
  return randomizedArr; 
}
