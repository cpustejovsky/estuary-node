import React, { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Button, Input, TextField, FormControl } from "@material-ui/core";

const url =
  "https://cpustejovsky.us18.list-manage.com/subscribe/post?u=5255bcd054238b51c87af4a7b&amp;id=aaa9023f7d";
const CustomForm = ({ status, message, onValidated, refs }) => {
  const [email, setEmail] = useState("");
  const submit = () => {
    return (
      email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      })
    );
  };
  return (
    <>
      <FormControl fullWidth>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          id="email"
          className="validate"
          // ref={(node) => (email = node)}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button size="large" variant="contained" color="primary" onClick={submit}>
          Submit{"    "}<i className="material-icons right">email</i>
        </Button>
        {status === "sending" && (
          <label htmlFor="email" style={{ color: "blue" }}>
            sending...
          </label>
        )}
        {status === "error" && (
          <label
            htmlFor="email"
            data-error="wrong"
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <label
            htmlFor="email"
            data-success="right"
            style={{ color: "green" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </FormControl>
    </>
  );
};
const MailChimpForm = () => {
  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => {
        return (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        );
      }}
    />
  );
};

export default MailChimpForm;
