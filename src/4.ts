interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): Key;
}

interface IHouse {
  comeIn(person: Person): void;
  openDoor(key: Key): void;
}

class Key implements IKey {
  protected signature = Math.random() + 1;

  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House implements IHouse {
  protected tentants: Person[] = [];
  protected door: boolean = false;

  constructor(protected key: Key) {}

  public comeIn(person: Person): void {
    if (this.door) {
      this.tentants.push(person);
    } else {
      console.error('Access denied!');
    }
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  public openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    } else {
      console.error('Access is denied!');
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
