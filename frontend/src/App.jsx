import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import UserContext from "./context/UserContext";

export default function App() {
    return (
        <>
        <UserContext>
            <RouterProvider router={router}></RouterProvider>
            </UserContext>
                
            
        </>
    );
}
