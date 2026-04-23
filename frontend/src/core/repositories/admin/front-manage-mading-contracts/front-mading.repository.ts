import type { FrontMadingDTO } from "../../../dto/front-mading.dto";
import type { FrontMadingEntity } from "../../../entities/front-mading.entity";

export interface FrontMadingRepository {
  createMading(data: FormData): Promise<void>;
  findMadingById(id: string): Promise<FrontMadingEntity | null>;
  updateMadingById(id: string, data: FrontMadingDTO): Promise<void>;
  getMading(): Promise<FrontMadingEntity[] | null>;
  deleteMadingById(id: string): Promise<void>;
  deleteAllMading(ids: string[]): Promise<void>;
}
