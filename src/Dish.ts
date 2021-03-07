class Dish {
  private type: string;
  private size: string;
  private number: string;
  constructor(type: string, size: string, number: string) {
    this.type = type;
    this.size = size;
    this.number = number;
  }

  public getDish() {
    return `${this.type} ${this.size} x${this.number}`;
  }
}

export default Dish;
