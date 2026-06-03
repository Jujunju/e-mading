import { MadingEntity } from "../../../../entities/mading.entity";
import { MadingDTO } from '../../../../../interface-adapters/dtos/mading/mading.dtos';

export interface MadingRepository {
  create(data: MadingDTO): Promise<MadingEntity | null>;
  findMadingById(id: string): Promise<MadingEntity | null>;
  findManyMadingById(ids: string[]): Promise<MadingEntity[] | null>;
  getMading(): Promise<MadingEntity[]>;
  updateMadingById(id: string, data: MadingDTO): Promise<MadingEntity | null>;
  deleteMadingById(id: string): Promise<MadingEntity | null>;
  deleteAllMading(ids: string[]): Promise<boolean>;
}