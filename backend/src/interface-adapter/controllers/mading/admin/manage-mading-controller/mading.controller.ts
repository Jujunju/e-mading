import { GetAllMadingUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/get-all-mading.usecase';
import { CreateMadingUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/create-mading.usecase';
import { HttpResponse } from '../../../../../infrastructure/helpers/http-response.helper';
import { DeleteMadingByIdUsecase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/delete-mading-by-id.usecase';
import { GetMadingByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/get-mading-by-id.usecase';
import { UpdateMadingByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/update-mading-by-id.usecase';
import { BulkDeleteMadingByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/bulk-delete-mading-by-id.usecase';
import { MadingDTO } from '../../../../../domain/dtos/mading/mading.dtos';
import { MadingPresenter } from '../../../../presenter/mading/mading.presenter';

export class MadingController {
  constructor(
    private createMadingUseCase: CreateMadingUseCase,
    private getMadingByIdUseCase: GetMadingByIdUseCase,
    private getAllMadingUseCase: GetAllMadingUseCase,
    private updateMadingByIdUseCase: UpdateMadingByIdUseCase,
    private deleteMadingByIdUseCase: DeleteMadingByIdUsecase,
    private bulkDeleteMadingByIdUseCase: BulkDeleteMadingByIdUseCase,
  ) {}
  async handleCreateMading(dto: MadingDTO) {
    try {
      const response = await this.createMadingUseCase.execute(dto);
      return HttpResponse.ok(response, 'Data berhasil dibuat!');
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleGetMadingById(id: string) {
    try {
      const response = await this.getMadingByIdUseCase.execute(id);
      return HttpResponse.ok(MadingPresenter.toResponse(response));
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleGetMading() {
    try {
      const response = await this.getAllMadingUseCase.execute();
      return HttpResponse.ok(MadingPresenter.toListResponse(response));
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleUpdateMadingById(dto: MadingDTO) {
    try {
      const response = await this.updateMadingByIdUseCase.execute(dto);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteMadingById(id: string) {
    try {
      const response = await this.deleteMadingByIdUseCase.execute(id);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleBulkDeleteMadingByIds(ids: string[]) {
    try {
      const response = await this.bulkDeleteMadingByIdUseCase.execute(ids);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
