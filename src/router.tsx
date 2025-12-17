import { LoaderIcon } from "lucide-react";
import { useAuthUser } from "./features/auth/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Home from "./features/home/Home";
import ProductView from "./features/home/ProductDetails";
import Cart from "./features/cart/cart";
import { Toaster } from "./components/ui/sonner";
import Login from "./features/auth/Login";

export const Router = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={authUser ? <Navigate to="/home" replace /> : <Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ProductView />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Layout>
                <Cart />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
};
