import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
const Aboutus = React.lazy(() => import("pages/Aboutus"));
const Contactus = React.lazy(() => import("pages/Contactus"));
const BlogDetail = React.lazy(() => import("pages/BlogDetail"));
const Blog = React.lazy(() => import("pages/Blog"));
const Team = React.lazy(() => import("pages/Team"));
const MyHome = React.lazy(() => import("pages/MyHome"));
const Order = React.lazy(() => import("pages/Orders"));
const ProductList = React.lazy(() => import("pages/ProductList"));
const Reward = React.lazy(() => import("pages/Rewards"));
const Wishlist = React.lazy(() => import("pages/Wishlist"));
const Checkout = React.lazy(() => import("pages/Checkout"));
const ProductDetail = React.lazy(() => import("pages/ProductDetail"));
const ShopDetailDescription = React.lazy(
  () => import("pages/ShopDetailDescription"),
);
const Shop = React.lazy(() => import("pages/Shop"));
const Homepage = React.lazy(() => import("pages/Homepage"));
const Cart = React.lazy(() => import("pages/Cart"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/shopdetaildescription"
            element={<ShopDetailDescription />}
          />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product-list/:categoryId" element={<ProductList />} />
          <Route path="/reward" element={<Reward />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogdetail" element={<BlogDetail />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/dhiwise-dashboard" element={<Home />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
