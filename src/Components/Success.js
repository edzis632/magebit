import React, { useState } from 'react';
import Icon from "./Icon.js";

export default function Success({ heading, description, className="" }) {
    const [isChecked, setIsChecked] = useState(false);


    return (
    <div className={`text__section global__margin ` + className}>
        <Icon name="success" />
        <h1>
            {heading}
        </h1>
        <p>
            {description}
        </p>
    </div>
    );
}
