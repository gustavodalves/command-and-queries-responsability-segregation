import CommandMediator from "./cmd/mediator";
import CreateUserCommand from "./cmd/users/commands/create-user";
import CreateUserHandler from "./cmd/users/handlers/create-user-handler";
import UserRepositoryInMemory from "./cmd/users/infra/user-repository-in-memory";
import GetUserByName from "./query/get-user-by-name";

const mediator = new CommandMediator()

const userRepositoryInMemory = new UserRepositoryInMemory()

const createUserHandler = new CreateUserHandler(userRepositoryInMemory)
mediator.addHandler(createUserHandler)

mediator.executeCommand(
    new CreateUserCommand("Gustavo")
)

const getUserByNameQuery = new GetUserByName()

getUserByNameQuery.findByName(
    "Gustavo"
).then(console.log)
