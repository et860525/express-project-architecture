// Mongoose strongly recommend not to use extends the `document`
export interface CoreDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}