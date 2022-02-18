import React, { useState } from 'react';
import Icon from "./Icon.js";

export default function Checkbox({ name, value }) {
    const [isChecked, setIsChecked] = useState(false);


    return (
    <label>
        <input
            type="checkbox"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
      <span className={`checkbox ${isChecked ? "checkbox--active" : ""}`}>
          <Icon name="checkmark" />
      </span>
      <span>{value}</span>
    </label>
    );
}
