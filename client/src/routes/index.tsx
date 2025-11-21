import { createBrowserRouter } from "react-router";

import login from "./login";
import root from "./root";
import round from "./round";

const router = createBrowserRouter([login, root, round]);

export default router;
