import { FrontBulkDeleteMadingByIdsUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/front-bulk-delete-mading-by-ids.usecase';
import { FrontDeleteMadingByIdUsecase } from '../../../core/usecases/mading/admin/front-manage-mading/front-delete-mading-by-id.usecase';
import { FrontGetAllMadingUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/front-get-all-mading.usecase';
import { FrontCreateMadingUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/page-add-mading/front-create-mading.usecse';
import { FrontUpdateMadingByIdUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/page-update-mading/front-update-mading-by-id.usecase';
import { FrontGetMadingByIdUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/page-update-mading/front-get-mading-by-id-mading.usecase';
import { FrontMadingImplRepository } from '../../../data/repositories/mading/admin/front-manage-mading-impl-repository/front-mading-impl.repository';

const madingRepoImpl = new FrontMadingImplRepository();
export const createMadingUC = new FrontCreateMadingUseCase(madingRepoImpl);
export const getAllMadingUC = new FrontGetAllMadingUseCase(madingRepoImpl);
export const getMadingByIdUC = new FrontGetMadingByIdUseCase(madingRepoImpl);
export const updateMadingByIdUC = new FrontUpdateMadingByIdUseCase(madingRepoImpl);
export const deleteMadingByIdUC = new FrontDeleteMadingByIdUsecase(madingRepoImpl);
export const bulkDeleteMadingByIdsUC = new FrontBulkDeleteMadingByIdsUseCase(madingRepoImpl);
