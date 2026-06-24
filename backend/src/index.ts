import express from 'express';
import 'dotenv/config';

import { connectDB } from './infrastructure/databases/mongodb/config/db-mongodb.config';
import { attechRoute, serverExpress, startServer } from './infrastructure/webserver/server';
import { CreateUserUseCase } from './domain/use-cases/user/manage-user-logic/create-user.usecase';
import { UserMongodbRepository } from './infrastructure/databases/mongodb/repositories/user/manage-user-impl-repository/user-mongodb.repository';
import { AuthBcrypt } from './infrastructure/security/bcrypt.security';
import { AuthController } from './interface-adapter/controllers/auth/auth.controller';
import { LoginUseCase } from './domain/use-cases/auth/manage-auth-logic/login.usecase';
import { ITokenJwt } from './infrastructure/security/jwt.security';
import { CreateMadingUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/create-mading.usecase';
import { GetAllMadingUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/get-all-mading.usecase';
import { MadingMongodbRepository } from './infrastructure/databases/mongodb/repositories/mading/admin/manage-mading-impl-repository/mading-mongodb.repository';
import { MadingController } from './interface-adapter/controllers/mading/admin/manage-mading-controller/mading.controller';
import { DeleteMadingByIdUsecase } from './domain/use-cases/mading/admin/manage-mading-logic/delete-mading-by-id.usecase';
import { StudentController } from './interface-adapter/controllers/mading/admin/manage-student-controller/student.controller';
import { GetAllStudentUseCase } from './domain/use-cases/mading/admin/manage-students-logic/get-all-student.usecase';
import { StudentMongodbRepository } from './infrastructure/databases/mongodb/repositories/mading/admin/manage-students-impl-repository/student-mongodb.repository';
import { DeleteStudentByIdUseCase } from './domain/use-cases/mading/admin/manage-students-logic/delete-student-by-id.usecase';
import { ClientCommentController } from './interface-adapter/controllers/mading/client/user-comment-controller/u-comment.controller';
import { CreateCommentUseCase } from './domain/use-cases/mading/client/user-comment-logic/create-comment-user.usecase';
import { GetAllCommentUseCase } from './domain/use-cases/mading/client/user-comment-logic/get-all-comment-user.usecase';
import { DeleteCommentByIdUseCase } from './domain/use-cases/mading/client/user-comment-logic/delete-comment-user-by-id.usecase';
import { GetMadingByIdUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/get-mading-by-id.usecase';
import { UpdateMadingByIdUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/update-mading-by-id.usecase';
import { BulkDeleteMadingByIdUseCase } from './domain/use-cases/mading/admin/manage-mading-logic/bulk-delete-mading-by-id.usecase';
import { DeleteAllStudentUseCase } from './domain/use-cases/mading/admin/manage-students-logic/bulk-delete-student-by-id.usecase';
import { GetStudentByIdUseCase } from './domain/use-cases/mading/admin/manage-students-logic/get-student-by-id.usecase';
import { UpdateCommentUseCase } from './domain/use-cases/mading/client/user-comment-logic/update-user-comment.usecase';
import { UserCommentMongodbRepository } from './infrastructure/databases/mongodb/repositories/mading/client/user-comment-impl-repository/u-comment-mongodb.repository';
import { GetMadingBySlugUseCase } from './domain/use-cases/mading/client/user-mading-logic/get-mading-by-slug.usecase';
import { UserMadingMongodbRepository } from './infrastructure/databases/mongodb/repositories/mading/client/user-mading-impl-repository/u-mading-mongodb.repository';
import { UserMadingController } from './interface-adapter/controllers/mading/client/user-mading-controller/u-mading.controller';
import { AuthRoute } from './infrastructure/webserver/routes/auth/auth.routes';
import { AuthMiddleware } from './infrastructure/middleware/auth/auth.middleware';
import { MadingRoute } from './infrastructure/webserver/routes/mading/admin/manage-mading-route/manage-mading.routes';
import { StudentsRoute } from './infrastructure/webserver/routes/mading/admin/manage-student-route/manage-student.routes';
import { CommentClientRoute } from './infrastructure/webserver/routes/mading/client/user-comment-route/u-comment.routes';
import { MadingClientRoute } from './infrastructure/webserver/routes/mading/client/user-mading-route/u-mading.routes';
import { UserController } from './interface-adapter/controllers/user/user.controller';
import { UserRoute } from './infrastructure/webserver/routes/user/user';

const bootstrap = async () => {
  try {

    // Security
    const authBcrypt: AuthBcrypt = new AuthBcrypt();
    const iTokenJwt: ITokenJwt = new ITokenJwt();
    const authMiddleware = new AuthMiddleware(iTokenJwt);

    // Auth
    const iUserRepositories: UserMongodbRepository = new UserMongodbRepository();
    const loginUseCase: LoginUseCase = new LoginUseCase(iUserRepositories, authBcrypt, iTokenJwt);
    const authController: AuthController = new AuthController(loginUseCase);
    const authRoute = new AuthRoute(authController, authMiddleware);

    // User
    const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(iUserRepositories, authBcrypt);
    const userController: UserController = new UserController(createUserUseCase);
    const userRoute = new UserRoute(userController);

    // Mading Admin
    const madingMongodbRepository: MadingMongodbRepository = new MadingMongodbRepository();
    const createMadingUseCase: CreateMadingUseCase = new CreateMadingUseCase(madingMongodbRepository);
    const getMadingUseCase: GetAllMadingUseCase = new GetAllMadingUseCase(madingMongodbRepository);
    const getMadingByIdUseCase: GetMadingByIdUseCase = new GetMadingByIdUseCase(madingMongodbRepository);
    const updateMadingByIdUseCase: UpdateMadingByIdUseCase = new UpdateMadingByIdUseCase(madingMongodbRepository);
    const deleteMadingByIdUseCase: DeleteMadingByIdUsecase = new DeleteMadingByIdUsecase(madingMongodbRepository);
    const deleteAllMadingUseCase: BulkDeleteMadingByIdUseCase = new BulkDeleteMadingByIdUseCase(madingMongodbRepository);
    const madingController: MadingController = new MadingController(createMadingUseCase, getMadingByIdUseCase, getMadingUseCase, updateMadingByIdUseCase, deleteMadingByIdUseCase, deleteAllMadingUseCase);
    const madingAdminRoute = new MadingRoute(madingController, authMiddleware);

    // Mading Client
    const userMadingMongodbRepository: UserMadingMongodbRepository = new UserMadingMongodbRepository();
    const getMadingBySlugUseCase: GetMadingBySlugUseCase = new GetMadingBySlugUseCase(userMadingMongodbRepository);
    const userMadingController: UserMadingController = new UserMadingController(getMadingBySlugUseCase);
    const madingClientRoute = new MadingClientRoute(userMadingController);

    // Student
    const studentMongodbRepository: StudentMongodbRepository = new StudentMongodbRepository();
    const frontStudentUseCase: GetAllStudentUseCase = new GetAllStudentUseCase(studentMongodbRepository);
    const frontStudentByIdUseCase: GetStudentByIdUseCase = new GetStudentByIdUseCase(studentMongodbRepository);
    const deleteStudentUseCase: DeleteStudentByIdUseCase = new DeleteStudentByIdUseCase(studentMongodbRepository);
    const deleteAllStudentUseCase: DeleteAllStudentUseCase = new DeleteAllStudentUseCase(studentMongodbRepository);
    const studentController: StudentController = new StudentController(frontStudentUseCase, frontStudentByIdUseCase, deleteStudentUseCase, deleteAllStudentUseCase);
    const studentRoute = new StudentsRoute(studentController, authMiddleware);

    // Comment
    const commentRepository: UserCommentMongodbRepository = new UserCommentMongodbRepository();
    const createCommentUseCase: CreateCommentUseCase = new CreateCommentUseCase(commentRepository);
    const getCommentUseCase: GetAllCommentUseCase = new GetAllCommentUseCase(commentRepository);
    const editCommentUseCase: UpdateCommentUseCase = new UpdateCommentUseCase(commentRepository);
    const deleteCommentUseCase: DeleteCommentByIdUseCase = new DeleteCommentByIdUseCase(commentRepository);
    const commentController: ClientCommentController = new ClientCommentController(createCommentUseCase, getCommentUseCase, editCommentUseCase, deleteCommentUseCase);
    const commentRoute = new CommentClientRoute(commentController, authMiddleware);

    const router = express.Router();

    router.get('/', (req, res) => {
      res.status(200).json({
        status: 'Online',
        message: 'Backend E-Mading Digital ready bantai!',
        database: 'Connected',
      });
    });

    router.use('/api', authRoute.getRoutes());

    router.use('/api', userRoute.getRoutes());

    router.use('/api', studentRoute.getRoutes());

    router.use('/api', commentRoute.getRoutes());

    router.use('/api', madingAdminRoute.getRoutes());

    router.use('/api', madingClientRoute.getRoutes());

    const PORT = Number(process.env.PORT);

    attechRoute([router]);

    if (process.env.NODE_ENV !== 'production') {
      startServer(PORT, [router]);
    } else {
      // DB
      await connectDB();
    }
    
  } catch (error) {
    console.log(`Terjadi error ${error}`);
  }
};

bootstrap();
export default serverExpress;
