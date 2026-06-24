import type { FrontMadingEntity } from "../../../../entities/front-mading.entity";

export interface ClientFrontUserMadingRepository {
  findMadingBySlug(slug: string): Promise<FrontMadingEntity[] | null>;
}
