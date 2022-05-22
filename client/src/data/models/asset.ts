export const AssetModelName = 'Asset';

/** asset model */
export interface IAsset {
  _id?: String;
  ip: String;
  name: String;
  description?: String;
  date_created?: Date;
}
