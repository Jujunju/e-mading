import { GetMadingUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/get-mading.usecase';
import { CreateMadingUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/create-mading.usecase';
import { HttpResponse } from '../../../../helpers/http-response.helper';
import { DeleteMadingByIdUsecase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/delete-mading-by-id.usecase';
import { GetMadingByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/get-mading-by-id.usecase';
import { UpdateMadingByIdUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/update-mading-by-id.usecase';
import { DeleteAllMadingUseCase } from '../../../../../domain/use-cases/mading/admin/manage-mading-logic/delete-all-mading.usecase';
export class MadingController {
  constructor(
    public createMadingUseCase: CreateMadingUseCase,
    public getMadingByIdUseCase: GetMadingByIdUseCase,
    public getMadingUseCase: GetMadingUseCase,
    public updateMadingByIdUseCase: UpdateMadingByIdUseCase,
    public deleteMadingyIdUseCase: DeleteMadingByIdUsecase,
    public deleteAllMadingUseCase: DeleteAllMadingUseCase,
  ) {}
  async handleCreateMading(httpRequest: any) {
    try {
      const response = await this.createMadingUseCase.execute(httpRequest);
      return HttpResponse.created(response, 'Data berhasil dibuat');
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleGetMadingById(httpRequest: any) {
    try {
      const response = await this.getMadingByIdUseCase.execute(httpRequest);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }


  async handleGetMading() {
    try {
      const response = await this.getMadingUseCase.execute();
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleUpdateMading(httpRequest: any) {
    try {
      const response = await this.updateMadingByIdUseCase.execute(httpRequest);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteMading(httpRequest: any) {
    try {
      const response = await this.deleteMadingyIdUseCase.execute(httpRequest);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }

  async handleDeleteAllMading(httpRequest: any) {
    try {
      const response = await this.deleteAllMadingUseCase.execute(httpRequest);
      return HttpResponse.ok(response);
    } catch (error) {
      return HttpResponse.error(error);
    }
  }
}
