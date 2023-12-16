import { Equipment } from '../../company-profile/model/equipment.model';

export interface Item {
  item_id?: number;
  equipment: Equipment;
  quantity: number;
}
