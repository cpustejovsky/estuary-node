import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const url = process.env.REACT_APP_MC_URL;

const CustomForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    });

  return (
    <>
      <div className="input-field">
        <input
          id="email"
          className="validate"
          ref={(node) => (email = node)}
          type="email"
          placeholder="Your email"
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
      </div>
      <button className="btn" onClick={submit}>
        Submit<i className="material-icons right">email</i>
      </button>
    </>
  );
};

const MailChimpForm = () => {
  return (
    <MailchimpSubscribe
      url={url}
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
