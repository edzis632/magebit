import React from 'react';

export default function Nav({ className = "" }) {


    return (
        <nav className={`navigation ` + className}>
            <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">How it works</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
}
