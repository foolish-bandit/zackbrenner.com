import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { logCredits } from "../utils/logCredits";

import { Home } from "../pages/Home";

const Resume = lazy(() => import("../pages/Resume").then((m) => ({ default: m.Resume })));
const PageNotFound = lazy(() => import("../pages/PageNotFound").then((m) => ({ default: m.PageNotFound })));

const basename = process.env.PUBLIC_URL || "";

export const App = () => {
    logCredits();

    return (
        <Router basename={basename}>
            <HelmetMeta />
            <Suspense fallback={null}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/resume" component={Resume} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
};
