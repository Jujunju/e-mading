import { FrontDeleteAllMadingUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/front-delete-all-mading.usecase';
import { FrontDeleteMadingByIdUsecase } from '../../../core/usecases/mading/admin/front-manage-mading/front-delete-mading-by-id.usecase';
import { FrontGetMadingUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/front-mading.usecase';
import { FrontCreateMadingUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/page-add-mading/front-create-mading.usecse';
import { FrontEditMadingByIdUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/page-edit-mading/front-edit-mading-by-id.usecase';
import { FrontGetMadingByIdUseCase } from '../../../core/usecases/mading/admin/front-manage-mading/page-edit-mading/front-get-mading-by-id-mading.usecase';
import { FrontMadingImplRepository } from '../../../data/repositories/mading/admin/front-manage-mading-impl-repository/front-mading-impl.repository';

const madingRepoImpl = new FrontMadingImplRepository()
export const createMadingUC = new FrontCreateMadingUseCase(madingRepoImpl);
export const getMadingUC = new FrontGetMadingUseCase(madingRepoImpl);
export const getMadingByIdUC = new FrontGetMadingByIdUseCase(madingRepoImpl);
export const editMadingByIdUC = new FrontEditMadingByIdUseCase(madingRepoImpl);
export const deleteMadingByIdUC = new FrontDeleteMadingByIdUsecase(madingRepoImpl);
export const deleteAllMadingUC = new FrontDeleteAllMadingUseCase(madingRepoImpl);