import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import StudentContext from "./context/StudentContext";

export default function App() {
    return (
        <>
        <StudentContext>
            <RouterProvider router={router}></RouterProvider>
            </StudentContext>
                
            
        </>
    );
}
