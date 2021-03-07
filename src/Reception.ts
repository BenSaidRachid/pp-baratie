import readline from "readline";
import Dish from "./Dish";
import data from "./data";
import { getEnumKeys } from "./utils";

class Reception {
  private multiplier: number;
  private nbCooks: number;
  private time: number;
  private rl: readline.Interface;

  constructor(multiplier: number, nbCooks: number, time: number) {
    this.multiplier = multiplier;
    this.nbCooks = nbCooks;
    this.time = time;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log("======= Welcome to the baratie =======");
    this.takeOrder();
  }

  takeOrder() {
    this.rl.question("Can I take your order ? ", (order: string): void => {
      if (order === "status") {
        this.printStatus();
      } else {
        this.prepareOrder(order);
      }
      this.takeOrder();
    });
  }

  private printStatus() {
    console.log(`
======= STATUS =======
Cooking multiplier : ${this.multiplier}
Cooks per kitchen : ${this.nbCooks}
Time to replace ingredients : ${this.time}
        `);
  }

  private prepareOrder(order: String) {
    const dishes = this.parseDishes(order);
  }

  private parseDishes(order: String): Dish[] {
    const dishes = order
      .split(";")
      .filter((dish) => dish.length > 0)
      .map((dish) => dish.trim().split(" "));
    const dishCollections: Dish[] = [];
    for (const dish of dishes) {
      if (!this.checkGrammar(dish)) {
        console.log("Invalid grammar");
      } else {
        dishCollections.push(new Dish(dish[0], dish[1], dish[2]));
      }
    }
    return dishCollections;
  }

  private checkGrammar(command: String[]): boolean {
    if (command.length != 3) return false;
    for (let i = 0; i < command.length; i++) {
      switch (i) {
        case 0:
          if (!this.checkType(command[i])) return false;
          break;
        case 1:
          if (!this.checkSize(command[i])) return false;
          break;
        case 2:
          if (this.checkNumber(command[i])) return false;
          break;
      }
    }
    return true;
  }

  private checkType(value: String) {
    const type = getEnumKeys(data.DishType);
    return type.indexOf(value) >= 0;
  }

  private checkSize(value: String) {
    const size = getEnumKeys(data.DishType);
    return size.indexOf(value) >= 0;
  }

  private checkNumber(value: String) {
    return value.match(/^(x[0-9]+)$/) != null
  }
}

export default Reception;
