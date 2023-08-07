import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./components/CartProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyOrder from "./pages/MyOrder";
import Features from "./pages/Features";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "myorder",
      element: <MyOrder />,
    },
    {
      path: "features",
      element: <Features />,
    },
  ]);

  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}

export default App;
