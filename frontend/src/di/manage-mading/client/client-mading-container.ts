import { FrontGetMadingBySlugUseCase } from "../../../core/usecases/mading/client/user-mading/front-get-mading-by-slug.usecase";
import { ClientFrontUserMadingImplRepository } from "../../../data/repositories/mading/client/user-mading/front-user-mading-impl.repository";

const clientMadingRepoImpl = new ClientFrontUserMadingImplRepository()
export const getMadingBySlug = new FrontGetMadingBySlugUseCase(clientMadingRepoImpl)