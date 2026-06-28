import { ObjectId } from "mongodb";

export class App {
    _id: ObjectId;
    name: string;
    owner: string;
    createdAt: Date;

    constructor(
        name: string,
        owner: string,
        createdAt: Date,
        _id?: ObjectId,
    ) {
        this.name = name;
        this.owner = owner;
        this.createdAt = createdAt;
        this._id = _id ?? new ObjectId();
    }
}

export type AppDoc = {
    _id: ObjectId;
    name: string;
    owner: string;
    createdAt: Date;
};

export function toApp(doc: AppDoc): App {
  return new App(doc.name, doc.owner, doc.createdAt, doc._id);
}