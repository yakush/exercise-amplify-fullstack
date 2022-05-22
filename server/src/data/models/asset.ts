import mongoose, { Schema, Document, Types } from "mongoose";

export const AssetModelName = "Asset";

/**  Type */
export interface IAsset {
  ip: String;
  name: String;
  description?: String;
  date_created: Date;
}
export interface IAssetDocument extends IAsset, Document {}

/**  Schema */
export const AssetSchema = new Schema<IAssetDocument>({
  ip: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  date_created: { type: Date, required: true, default: Date.now },
});

/**  mongoose Model */
export const AssetModel = mongoose.model<IAssetDocument>(
  AssetModelName,
  AssetSchema
);

/*
// Instantiate instances of both models
const child = new ChildModel({ name: "Lisa", age: 7 });
const parent = new ParentModel({ name: "Steve", children: [child] });

const childId = child._id;

// Try to use mongoose subdocument methods
const idRetrievedChild = parent.children.id(childId); // Property 'id' does not exist on type 'IChild[]'.ts(2339)
parent.children.addToSet({ name: "Liesl", age: 10 }); // Property 'addToSet' does not exist on type 'IChild[]'.ts(2339)
parent.children.create({ name: "Steve Jr", age: 2 }); // Property 'create' does not exist on type 'IChild[]'.ts(2339)

// If I always know the exact position in the array of what I'm looking for
const arrayRetrievedChild = parent.children[0]; // no editor errors
parent.children.unshift(); // no editor errors
parent.children.push({ name: "Emily", age: 18 }); // no editor errors
*/
