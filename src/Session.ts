import { ObjectId } from "mongodb";

export type Session = {
    createdAt: Date;
    _id: ObjectId;
};