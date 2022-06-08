import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Spin } from "antd";
import { Routes, Route } from "react-router-dom";
import { UserContext, UserInfo } from "./context/user";
//import SearchResult from "./pages/web/search_result/result";
// import Article from "./pages/article";
// import ArtEditor from "./pages/web/art_editor/article_editor";
// import Home from "./pages/web/home/home";
// import AcountSet from "./pages/web/personal/acount_set/acount_set";
// import Recommendation from "./pages/web/home/recommendation";
// import Personal from "./pages/web/personal/personal";
// import UserInfoC from "./pages/web/personal/userinfo/user_info";
// import ArticleSet from "./pages/web/personal/content_set/article_set/article_set";
// import AdminIndex from "./pages/admin";
// import ArtAdmin from "./pages/admin/content/article";
// import UserAdmin from "./pages/admin/content/user";
const UserSpace = React.lazy(() => import('./pages/web/space/space'));
const SearchResult = React.lazy(() => import('./pages/web/search_result/result'));
const MDArticle = React.lazy(() => import('./pages/web/article/article'));
const App = React.lazy(() => import('./App'));
const ServerDataIndex = React.lazy(() => import('./pages/admin/content/site_data/server_data'));

const Article = React.lazy(() => import('./pages/article'));
const ArtEditor = React.lazy(() => import('./pages/web/art_editor/article_editor'));
const Home = React.lazy(() => import('./pages/web/home/home'));
const AcountSet = React.lazy(() => import('./pages/web/personal/acount_set/acount_set'));
const Recommendation = React.lazy(() => import('./pages/web/home/recommendation'));
const Personal = React.lazy(() => import('./pages/web/personal/personal'));
const UserInfoC = React.lazy(() => import('./pages/web/personal/userinfo/user_info'));
const ArticleSet = React.lazy(() => import('./pages/web/personal/content_set/article_set/article_set'));
const AdminIndex = React.lazy(() => import('./pages/admin'));
const ArtAdmin = React.lazy(() => import('./pages/admin/content/article'));
const UserAdmin = React.lazy(() => import('./pages/admin/content/user'));


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
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
    }, [user])
    return (
        <UserContext.Provider value={{ userinfo: user, setUser: setUser }}>
            <Routes>
                <Route path="/">
                    <Route path="h/*" element={<Lazy render={<App />} />}>
                        <Route path="home/*" element={<Lazy render={<Home />} />}>
                            <Route path="recommendation" element={<Lazy render={<Recommendation />} />}></Route>
                        </Route>

                        <Route path="articles" element={<Lazy render={<Article />} />} />

                        <Route path="personal/*" element={<Lazy render={<Personal />} />}>
                            <Route path="acount-set" element={<Lazy render={<AcountSet />} />}></Route>
                            <Route path="base-info" element={<Lazy render={<UserInfoC />} />}></Route>
                            <Route path="article-set" element={<Lazy render={<ArticleSet />} />} />
                        </Route>

                        <Route path="editor" element={<Lazy render={<ArtEditor />} />} >
                            <Route path=":articleId"></Route>
                        </Route>

                        <Route path="article" element={<Lazy render={<MDArticle />} />}>
                            <Route path=":articleId"></Route>
                        </Route>

                        <Route path="search" element={<Lazy render={<SearchResult />} />}></Route>

                        <Route path="space" element={<Lazy render={<UserSpace />} />}>
                            <Route path=":userId"></Route>
                        </Route>
                    </Route>

                </Route>
                {user?.role === "ROLE_ADMIN" ? <Route path="admin/*" element={<Lazy render={<AdminIndex />} />}>
                    <Route path="article" element={<Lazy render={<ArtAdmin />} />}></Route>
                    <Route path="report"></Route>
                    <Route path="server-data" element={<Lazy render={<ServerDataIndex />} />}></Route>
                    <Route path="user" element={<Lazy render={<UserAdmin />} />}></Route>
                </Route> : null}
                
            </Routes>
        </UserContext.Provider>
    )
}

interface LazyProps {
    render: React.ReactNode
}

const Lazy: React.FC<LazyProps> = (props) => {

    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        const id = setTimeout(() => {
            setShow(true);
            // 延迟时间可自己拿捏
        }, 500);

        return () => {
            clearTimeout(id);
        };
    }, []);


    return (
        <Suspense
            fallback={
                show ? <div style={{ width: "100%", height: "100%", minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center", background: "#fff" }}>
                    <Spin size="large" tip="正在加载组件..." />
                </div> : null
            }
        >
            {props.render}
        </Suspense>
    )
}

export default Routers;