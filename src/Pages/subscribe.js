import React, { useState } from "react";

import SignupForm from "../Components/Form.js";
import Social from "../Components/Social.js";
import Logo from "../Components/Logo.js";
import Nav from "../Components/Nav.js";
import SummerImage from "../images/image_summer.png";

import '../style.scss';

export default function Subscribe() {
  const [done, setDone] = useState(true);

    return (
        <div className="section__subscribe">
            <div className="container">
                <div className="form">
                    <div className="header">
                        <Logo />
                        <Nav />
                    </div>
                    <div className="subscribe__form">
                        <SignupForm />
                        <Social />
                    </div>
                </div>
                <div className="subscribe__image">
                {/*             <img src={SummerImage} alt="Subscribe"/>*/}
                </div>
            </div>
        </div>
    );
}