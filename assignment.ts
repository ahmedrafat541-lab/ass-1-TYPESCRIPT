class User {
  protected id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age: number;
  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this._age = age;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

  getId(): number {
    return this.id;
  }

  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  getNotebooks(): NoteBook[] {
    return this.notebooks;
  }

  displayInfo(): void {
    console.log(`Id: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
    console.log(`Phone: ${this.phone}`);
    console.log(`Age: ${this._age}`);
  }
}

class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    super(id, name, email, password, phone, age);
  }

  manageNotes(notebook: NoteBook, noteId: number): boolean {
    const removed = notebook.removeNote(noteId);
    if (removed) {
      console.log(`Admin ${this.name} removed note ${noteId}`);
    } else {
      console.log(`Note ${noteId} was not found`);
    }
    return removed;
  }
}

class Note {
  public id: number;
  public tittle: string;
  public content: string;
  public userId: number;
  public author: User;

  constructor(id: number, tittle: string, content: string, author: User) {
    this.id = id;
    this.tittle = tittle;
    this.content = content;
    this.author = author;
    this.userId = author.getId();
  }

  preview(): string {
    if (this.content.length > 30) {
      return this.content.substring(0, 30) + "...";
    }
    return this.content;
  }
}

class NoteBook {
  public title: string;
  private notes: Note[] = [];
  private nextId: number = 1;

  constructor(title: string) {
    this.title = title;
  }

  addNote(tittle: string, content: string, author: User): Note {
    const note = new Note(this.nextId, tittle, content, author);
    this.nextId++;
    this.notes.push(note);
    return note;
  }

  removeNote(id: number): boolean {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      return false;
    }
    this.notes.splice(index, 1);
    return true;
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

const user1 = new User(1, "Ahmed", "ahmed@gmail.com", "12345678", "01012345678", 21);
const admin1 = new Admin(2, "Mohamed", "mohamed@gmail.com", "admin1234", "01198765432", 35);

user1.displayInfo();
admin1.displayInfo();

const notebook1 = new NoteBook("Study Notes");
user1.addNotebook(notebook1);

const note1 = notebook1.addNote("TypeScript", "Classes and inheritance are part of OOP in TypeScript", user1);
const note2 = notebook1.addNote("Express", "Routes and middleware", user1);

console.log(note1.preview());
console.log(note2.preview());
console.log(note1.author.name);
console.log(notebook1.getNotes().length);

admin1.manageNotes(notebook1, 2);
console.log(notebook1.getNotes().length);

const numberStorage = new Storage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.addItem(30);
numberStorage.removeItem(20);
console.log(numberStorage.getAllItems());

const noteStorage = new Storage<Note>();
noteStorage.addItem(note1);
console.log(noteStorage.getAllItems());

export {};
