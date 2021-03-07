export function checkArgsType(args: String[]): null | number[] {
  for (const argument of args) {
    if (isNaN(Number(argument))) return null;
  }
  return args.map((argument) => Number(argument));
}

export function getEnumKeys(data: object): String[] {
  return Object.keys(data).filter(value => isNaN(Number(value)));
}

export default {
  checkArgsType,
  getEnumKeys
};
