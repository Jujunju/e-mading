import { MadingEntity } from '../../../../entities/mading.entity';

export interface UserMadingRepository {
  findMadingBySlug(slug: string): Promise<MadingEntity[]>;
}
