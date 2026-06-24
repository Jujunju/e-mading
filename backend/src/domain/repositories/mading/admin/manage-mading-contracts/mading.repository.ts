import { MadingEntity } from "../../../../entities/mading.entity";

export interface MadingRepository {
  create(data: MadingEntity): Promise<void>;
  findMadingById(id: string): Promise<MadingEntity | null>;
  findManyMadingByIds(ids: string[]): Promise<MadingEntity[]>;
  getAllMading(): Promise<MadingEntity[]>;
  updateMadingById(data: MadingEntity): Promise<boolean>;
  deleteMadingById(id: string): Promise<boolean>;
  bulkDeleteMadingByIds(ids: string[]): Promise<boolean>;
}