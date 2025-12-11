import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import { LoaderIcon } from "react-hot-toast";
import { useAuthUser } from "./features/auth/hooks";
import Home from "./features/home/Home";
import Layout from "./components/Layout/Layout";
import ProductView from "./features/home/ProductView";
import { Toaster } from "@/components/ui/sonner";

const Router = () => {
  const { authUser, isLoading } = useAuthUser();
  const isAuthenticated = Boolean(authUser);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}></Route>
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/product/:id" element={<ProductView />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default Router;
