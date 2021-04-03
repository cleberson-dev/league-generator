export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export function generateTeamsIds(amount: number) {
  const teamsIds: number[] = []

  for (let i = 1; i <= amount; i += 1) {
    teamsIds.push(i);
  }

  return teamsIds;
}
