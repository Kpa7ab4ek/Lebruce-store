import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./components/auth/Auth";
import {Home} from "./pages/Home";
import {Shop} from "./pages/Shop";
import {About} from "./pages/About";
import {Basket} from "./pages/Basket";
import {Sign} from "./pages/Sign";
import PayPage from "./pages/PayPage";
import ForgetPass from "./pages/ForgetPass";
import ProductCreateForm from "./pages/CreateProduct";
import Account from "./pages/Account";
import NotFounded from "./pages/NotFounded";
import AddAdd from "./pages/AddAdd";
import {PersonalProduct} from "./components/personalProduct/PersonalProduct";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/basket" element={<Basket />} />
                        <Route path="/paypage" element={<PayPage />} />
                        <Route path="/login" element={<Sign />} />
                        <Route path="/forgetpass" element={<ForgetPass />} />
                        <Route path="/createprod" element={<ProductCreateForm />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/products/:productName" element={<PersonalProduct />} />
                        <Route path="/addAdd" element={<AddAdd/>} />
                        <Route path="*" element={<NotFounded />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}
