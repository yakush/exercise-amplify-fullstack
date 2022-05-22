export const AssetModelName = 'Asset';

// model
export interface IAsset {
  _id?: String;
  ip: String;
  name: String;
  description?: String;
  date_created?: Date;
}
