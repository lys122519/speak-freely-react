import { Routes, Route } from "react-router-dom";
import App from "./App";
import Article from "./pages/article";
import Home from "./pages/home";

const Routers: React.FC<any> = () => {
    return (
        <Routes>
            <Route path="/">
                <Route path="h/*" element={<App />}>
                    <Route path="home" element={<Home />} />
                    <Route path="articles" element={<Article />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default Routers;