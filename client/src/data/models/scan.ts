export const ScanModelName = 'Scan';
export type SCAN_STATUS = 'pending' | 'successed' | 'failed';

/** scan model  */
export interface IScan {
  _id?: String;
  asset_ref: String; //ref to the parent asset
  date_created?: Date; // required
  scan_due_date: Date; // required
  date_completed?: Date; // optional
  status?: SCAN_STATUS; // one of ‘pending’, ‘successed’, ‘failed’ // required
}
