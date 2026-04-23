import express from 'express';
import 'dotenv/config';

import { connectDB } from './infrastructure/databases/mongodb/config/db-mongodb.config';
import { startServer } from './infrastructure/webserver/server';
import { RegisterUseCase } from './domain/use-cases/auth/manage-auth-logic/register.usecase';
import { AuthMongodbRepository } from './infrastructure/databases/mongodb/repositories/auth/manage-auth-impl-repository/auth-mongodb.repository';
import { AuthBcrypt } from './infrastructure/security/bcrypt.security';
import { AuthController } from './interface-adapters/controllers/auth/auth.controller';
import { loginRoute, registerRoute } from './infrastructure/webserver/routes/auth/auth.routes';
import { LoginUseCase } from './domain/use-cases/auth/manage-auth-logic/login.usecase';
import { ITokenJwt } from './infrastructure/security/jwt.security';
import { CreateMadingUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/create-mading.usecase';
import { createMading, deleteAllMading, deleteMading, getMading, getMadingById, updateMadingById } from './infrastructure/webserver/routes/admin/manage-mading-route/manage-mading.routes';
import { GetMadingUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/get-mading.usecase';
import { MadingMongodbRepository } from './infrastructure/databases/mongodb/repositories/admin/manage-mading-impl-repository/mading-mongodb.repository';
import { MadingController } from './interface-adapters/controllers/mading/admin/manage-mading-controller/mading.controller';
import { DeleteMadingByIdUsecase } from './domain/use-cases/mading/admin/manage-mading-logic/delete-mading-by-id.usecase';
import { StudentController } from './interface-adapters/controllers/mading/admin/manage-student-controller/student.controller';
import { GetStudentUseCase } from './domain/use-cases/mading/admin/manage-students-logic/get-student.usecase';
import { StudentMongodbRepository } from './infrastructure/databases/mongodb/repositories/admin/manage-students-impl-repository/student-mongodb.repository';
import { deleteAllStudent, deleteStudent, getStudent, getStudentById } from './infrastructure/webserver/routes/admin/manage-student-route/manage-student.routes';
import { DeleteStudentUseCase } from './domain/use-cases/mading/admin/manage-students-logic/delete-student.usecase';
import { deleteComment, editComment, getComment, saveComment } from './infrastructure/webserver/routes/client/user-comment-route/u-comment.routes';
import { ClientCommentController } from './interface-adapters/controllers/mading/client/user-comment-controller/comment.controller';
import { CreateCommentUseCase } from './domain/use-cases/mading/client/user-comment-logic/create-user-comment.usecase';
import { CommentMongodbRepository } from './infrastructure/databases/mongodb/repositories/admin/manage-comment-impl-repository/comment-mongodb.repository';
import { GetCommentUseCase } from './domain/use-cases/mading/client/user-comment-logic/get-user-comment.usecase';
import { DeleteCommentUseCase } from './domain/use-cases/mading/client/user-comment-logic/delete-user-comment.usecase';
import { GetMadingByIdUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/get-mading-by-id.usecase';
import { UpdateMadingByIdUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/update-mading-by-id.usecase';
import { DeleteAllMadingUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/delete-all-mading.usecase';
import { DeleteAllStudentUseCase } from './domain/use-cases/mading/admin/manage-students-logic/delete-all-student.usecase';
import { GetStudentByIdUseCase } from './domain/use-cases/mading/admin/manage-students-logic/get-student-by-id.usecase';
import { getCommentById } from './infrastructure/webserver/routes/admin/manage-comment-route/manage-comment.routes';
// import { CommentRepository } from './domain/repositories/mading/admins/manage-comment-contracts/comment.repository';
import { AdminCommentController } from './interface-adapters/controllers/mading/admin/manage-comment-controller/comment.controller';
import { GetCommentByIdUseCase } from './domain/use-cases/mading/admin/manage-comment-logic/get-comment-by-id.usecase';
import { EditCommentUseCase } from './domain/use-cases/mading/client/user-comment-logic/edit-user-comment.usecase';
import { UserCommentMongodbRepository } from './infrastructure/databases/mongodb/repositories/client/user-comment-impl-repository/u-comment-mongodb.repository';
import { GetMadingBySlugUseCase } from './domain/use-cases/mading/client/user-mading-logic/get-mading-by-slug.usecase';
import { UserMadingMongodbRepository } from './infrastructure/databases/mongodb/repositories/client/user-mading-impl-repository/u-mading-mongodb.repository';
import { UserMadingController } from './interface-adapters/controllers/mading/client/user-mading-controller/mading.controller';
import { getMadingBySlug } from './infrastructure/webserver/routes/client/user-mading-route/u-mading.routes';

const bootstrap = async () => {
  try {
    const router = express.Router();

    // Database
    await connectDB();

    // Security
    const iUserRepositories: AuthMongodbRepository = new AuthMongodbRepository();
    const authBcrypt: AuthBcrypt = new AuthBcrypt();
    const iTokenJwt: ITokenJwt = new ITokenJwt();

    // Login & Register
    const registerUseCase: RegisterUseCase = new RegisterUseCase(iUserRepositories, authBcrypt);
    const loginUseCase: LoginUseCase = new LoginUseCase(iUserRepositories, authBcrypt, iTokenJwt);
    const authController: AuthController = new AuthController(registerUseCase, loginUseCase);
    const registrasiRouteAuth = registerRoute(authController);
    const loginRouteAuth = loginRoute(authController);

    // Mading Admin
    const madingMongodbRepository: MadingMongodbRepository = new MadingMongodbRepository();
    const createMadingUseCase: CreateMadingUseCase = new CreateMadingUseCase(madingMongodbRepository);

    const getMadingUseCase: GetMadingUseCase = new GetMadingUseCase(madingMongodbRepository);
    const getMadingByIdUseCase: GetMadingByIdUseCase = new GetMadingByIdUseCase(madingMongodbRepository);
    const updateMadingByIdUseCase: UpdateMadingByIdUseCase = new UpdateMadingByIdUseCase(madingMongodbRepository);
    const deleteMadingByIdUseCase: DeleteMadingByIdUsecase = new DeleteMadingByIdUsecase(madingMongodbRepository);
    const deleteAllMadingUseCase: DeleteAllMadingUseCase = new DeleteAllMadingUseCase(madingMongodbRepository);
    const madingController: MadingController = new MadingController(createMadingUseCase, getMadingByIdUseCase, getMadingUseCase, updateMadingByIdUseCase, deleteMadingByIdUseCase, deleteAllMadingUseCase);
    const createMadingRoute = createMading(madingController);
    const getMadingRoute = getMading(madingController);
    const getMadingByIdRoute = getMadingById(madingController);
    const updateMadingByIdRoute = updateMadingById(madingController);
    const deleteMadingRoute = deleteMading(madingController);
    const deleteAllMadingRoute = deleteAllMading(madingController);
    
    // Mading Client
    const userMadingMongodbRepository: UserMadingMongodbRepository = new UserMadingMongodbRepository()
    const getMadingBySlugUseCase: GetMadingBySlugUseCase = new GetMadingBySlugUseCase(userMadingMongodbRepository);
    const userMadingController: UserMadingController = new UserMadingController(getMadingBySlugUseCase);
    const getMadingBySlugRoute = getMadingBySlug(userMadingController);
    
    // Siswa
    const studentMongodbRepository: StudentMongodbRepository = new StudentMongodbRepository();
    const frontStudentUseCase: GetStudentUseCase = new GetStudentUseCase(studentMongodbRepository);
    const frontStudentByIdUseCase: GetStudentByIdUseCase = new GetStudentByIdUseCase(studentMongodbRepository);
    const deleteStudentUseCase: DeleteStudentUseCase = new DeleteStudentUseCase(studentMongodbRepository);
    const deleteAllStudentUseCase: DeleteAllStudentUseCase = new DeleteAllStudentUseCase(studentMongodbRepository);
    const studentController: StudentController = new StudentController(frontStudentUseCase, frontStudentByIdUseCase, deleteStudentUseCase, deleteAllStudentUseCase);
    const getStudentRoute = getStudent(studentController);
    const getStudentByIdRoute = getStudentById(studentController);
    const deleteStudentRoute = deleteStudent(studentController);
    const deleteAllStudentRoute = deleteAllStudent(studentController);

    // comment client
    const ClientCommentRepository: UserCommentMongodbRepository = new UserCommentMongodbRepository();
    const createCommentUseCase: CreateCommentUseCase = new CreateCommentUseCase(ClientCommentRepository);
    const getCommentUseCase: GetCommentUseCase = new GetCommentUseCase(ClientCommentRepository);
    const editCommentUseCase: EditCommentUseCase = new EditCommentUseCase(ClientCommentRepository);
    const deleteCommentUseCase: DeleteCommentUseCase = new DeleteCommentUseCase(ClientCommentRepository);
    const commentController: ClientCommentController = new ClientCommentController(createCommentUseCase, getCommentUseCase, editCommentUseCase, deleteCommentUseCase);
    const saveCommentRoute = saveComment(commentController);
    const getCommentRoute = getComment(commentController);
    const editCommentRoute = editComment(commentController);
    const deleteCommentRoute = deleteComment(commentController);
    
    // comment admin
    const adminCommentRepository: CommentMongodbRepository = new CommentMongodbRepository()
    const adminGetCommentByIdUseCase: GetCommentByIdUseCase = new GetCommentByIdUseCase(adminCommentRepository);
    const adminCommentController: AdminCommentController = new AdminCommentController(adminGetCommentByIdUseCase);
    const adminGetCommentByIdRoute = getCommentById(adminCommentController);


    router.use('/api', registrasiRouteAuth);
    router.use('/api', loginRouteAuth);

    router.use('/api', getMadingRoute);
    router.use('/api', getMadingByIdRoute);
    router.use('/api', getMadingBySlugRoute);
    router.use('/api', createMadingRoute);
    router.use('/api', deleteAllMadingRoute);
    router.use('/api', deleteMadingRoute);
    router.use('/api', updateMadingByIdRoute);
    
    router.use('/api', getStudentRoute);
    router.use('/api', getStudentByIdRoute);
    router.use('/api', deleteStudentRoute);
    router.use('/api', deleteAllStudentRoute);
    
    router.use('/api', getCommentRoute);
    router.use('/api', saveCommentRoute);
    router.use('/api', editCommentRoute);
    router.use('/api', deleteCommentRoute);
    


    router.use('/api', adminGetCommentByIdRoute);

    startServer(process.env.PORT!, [router]);
  } catch (error) {
    console.log(`Terjadi error ${error}`);
  }
};

bootstrap();
