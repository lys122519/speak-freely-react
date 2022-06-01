import { Routes, Route } from "react-router-dom";
import App from "./App";
import Article from "./pages/article";
import Home from "./pages/home";
import Recommendation from "./pages/recommendation";

const Routers: React.FC<any> = () => {
    return (
        <Routes>
            <Route path="/">
                <Route path="h/*" element={<App />}>
                    <Route path="home/*" element={<Home />}>
                        <Route path="recommendation" element={<Recommendation />}></Route>
                    </Route>
                    <Route path="articles" element={<Article />} />
                </Route>
                <Route path="space">
                    <Route path=":userId"></Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default Routers;