import type { FrontMadingEntity } from '../../../../entities/front-mading.entity';

export interface FrontMadingRepository {
  create(data: FormData): Promise<unknown>;
  findMadingById(id: string): Promise<FrontMadingEntity | null>;
  updateMadingById(id: string, data: FormData): Promise<unknown>;
  getAllMading(): Promise<FrontMadingEntity[] | null>;
  deleteMadingById(id: string): Promise<unknown>;
  bulkDeleteMadingByIds(ids: string[]): Promise<unknown>;
}
