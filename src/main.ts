import { checkArgsType } from "./utils";
import Reception from "./Reception";

const args: string[] = process.argv.slice(2);
if (args.length < 3) {
  console.log(
    "usage: yarn start <multiplier> <number of cooks> <time in milliseconds>"
  );
  process.exit(0);
}

if (!checkArgsType(args)) {
  console.log("Arguments provided should be of number type");
  process.exit(0);
}
const [multiplier, nbCooks, time] = checkArgsType(args) || [];

new Reception(multiplier, nbCooks, time);