import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Detail from "./pages/detail";
import NotFound from "./pages/not-found";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only">
          İçeriğe geç
        </a>

        <Header />

        <main id="#main-content" className="container flex-1 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
