import React from 'react';
import Icon from "./Icon.js";

export default function Logo({ name }) {

    return (
        <div className="logo">
            <Icon name="pineapple" />
            <span className="logo__text">pineapple.</span>
        </div>
    );
}
