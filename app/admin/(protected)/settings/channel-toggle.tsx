"use client";

import { useState } from "react";

type ChannelToggleProps = {
  name: string;
  defaultChecked: boolean;
};

export default function ChannelToggle({ name, defaultChecked }: ChannelToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="admin-switch">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
          requestAnimationFrame(() => event.currentTarget.form?.requestSubmit());
        }}
      />
      <span className="admin-switch-track"><span /></span>
      <em>{checked ? "On" : "Off"}</em>
    </label>
  );
}
