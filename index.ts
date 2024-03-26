import * as dotenv from "dotenv";
// looks at .env and gets variable and loads to env
dotenv.config();

import app from "./server";

app.listen(3001, () => {
  console.log("hello world on http://localhost:3001");
});
