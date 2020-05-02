import React, {useState} from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Button, Input, TextField, FormControl } from "@material-ui/core";

const url = process.env.REACT_APP_MC_URL;

const CustomForm = ({ status, message, onValidated, refs }) => {
  const [email, setEmail] = useState("");
  const submit = () => {
    return email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
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
        <Button variant="outlined" color="primary" onClick={submit}>
          Submit<i className="material-icons right">email</i>
        </Button>
      </FormControl>
    </>
  );
};

const MailChimpForm = () => {
  return (
    <MailchimpSubscribe
      url={process.env.REACT_APP_MC_URL}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};

export default MailChimpForm;
