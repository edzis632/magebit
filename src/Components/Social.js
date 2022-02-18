import React from 'react';
import Icon from "./Icon.js";

export default function Social({ className = "" }) {

    return (
        <div className={`social__section ` + className}>
            <Icon name="facebook" />
            <Icon name="instagram" />
            <Icon name="twitter" />
            <Icon name="youtube" />
        </div>
    );
}
