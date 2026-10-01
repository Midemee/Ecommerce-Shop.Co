import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";

const App = () => <RouterProvider router={router} />;

export default App;