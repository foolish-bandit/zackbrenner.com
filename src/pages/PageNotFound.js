import React from "react";
import "./Home.css";

export const PageNotFound = () => {
    return (
        <div className="page">
            <main>
                <section className="intro">
                    <h1>Page <em>not found.</em></h1>
                    <p className="contact-lede">
                        There&rsquo;s nothing at this address. <a href="/">Head back home</a>.
                    </p>
                </section>
            </main>
        </div>
    );
};
