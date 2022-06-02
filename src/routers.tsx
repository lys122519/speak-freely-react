import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import { UserContext, UserInfo } from "./context/user";
import Article from "./pages/article";
import ArtEditor from "./pages/article_editor";
import Home from "./pages/home";
import ModPass from "./pages/mod_pass";
import Recommendation from "./pages/recommendation";
import UserSpace from "./pages/space";
import UserInfoC from "./pages/user_info";

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
    useEffect(() => {
        if(user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
    }, [user])
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
                            <Route path="base-info" element={<UserInfoC />}></Route>
                        </Route>
                    </Route>
                    <Route path="editor" element={<ArtEditor />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default Routers;