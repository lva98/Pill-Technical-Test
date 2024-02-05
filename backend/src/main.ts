import { runExpress } from "./infra/express/server";
import { runSequelize } from "./infra/sequelize/run-sequelize";

const bootstrap = async () => {
  runExpress()
  await runSequelize()
}

bootstrap()
