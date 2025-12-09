import { app_create, app_run } from "./core/app";
import { index_router } from "./routes";

const app = app_create();

app.use('/', index_router);

app_run(app);