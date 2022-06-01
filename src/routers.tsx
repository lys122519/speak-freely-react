import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import { UserContext, UserInfo } from "./context/user";
import Article from "./pages/article";
import Home from "./pages/home";
import ModPass from "./pages/mod_pass";
import Recommendation from "./pages/recommendation";
import UserSpace from "./pages/space";

const Routers: React.FC<any> = () => {
    const [user, setUser] = useState<UserInfo>();
    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setUser({
                status: 1,
                ...JSON.parse(sessionStorage.getItem("user") as string)
            });
        }
    }, []);
    return (
        <UserContext.Provider value={{userinfo: user, setUser: setUser}}>
            <Routes>
                <Route path="/">
                    <Route path="h/*" element={<App />}>
                        <Route path="home/*" element={<Home />}>
                            <Route path="recommendation" element={<Recommendation />}></Route>
                        </Route>
                        <Route path="articles" element={<Article />} />
                    </Route>
                    <Route path="space/*">
                        <Route path=":userId/*" element={<UserSpace />}>
                            <Route path="mod-pass" element={<ModPass />}></Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default Routers;