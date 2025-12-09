import { app_create, app_run } from "./core/app.js";
import { index_router } from "./routes/index.js";

const app = app_create();

app.use('/', index_router);

app_run(app);