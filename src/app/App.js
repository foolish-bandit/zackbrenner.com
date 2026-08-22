import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";

import { Home } from "../pages/Home";

const PageNotFound = lazy(() => import("../pages/PageNotFound").then((m) => ({ default: m.PageNotFound })));

const basename = process.env.PUBLIC_URL || "";

export const App = () => {
    return (
        <Router basename={basename}>
            <HelmetMeta />
            <Suspense fallback={null}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
};
