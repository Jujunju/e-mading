
import type { FrontMadingDTO } from "../../../dto/front-mading.dto";
import type { FrontMadingEntity } from "../../../entities/front-mading.entity";

export interface FrontMadingRepository {
  createMading(data: FormData): Promise<unknown>;
  findMadingById(id: string): Promise<FrontMadingEntity | null>;
  updateMadingById(id: string, data: FrontMadingDTO): Promise<unknown>;
  getMading(): Promise<FrontMadingEntity[] | null>;
  deleteMadingById(id: string): Promise<unknown>;
  deleteAllMading(ids: string[]): Promise<unknown>;
}
