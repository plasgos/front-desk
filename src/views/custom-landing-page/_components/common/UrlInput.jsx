import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";

const UrlInput = ({ id, url, handleUrlChange, handleUrlOpenNewTabChange }) => (
  <div className="form-group">
    <label>URL</label>
    <Input
      value={url.url}
      onChange={(e) => handleUrlChange(e.target.value)}
      type="text"
    />
    <Checkbox
      id={id}
      checked={url.isOpenNewTab}
      onChange={(e) => handleUrlOpenNewTabChange(e.target.checked)}
      label="Buka di tab baru"
    />
  </div>
);

export default UrlInput;
