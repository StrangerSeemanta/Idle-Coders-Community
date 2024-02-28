import { Fragment } from "react";

export default function Policies() {
  return (
    <Fragment>
      <p>
        Before form submission make sure that <strong>you are not sending any false information</strong>
        If you send false information or illegal informations then we are not responsible for any kind of trouble you will face.
        <br /><br /> <strong><span className="text-danger">Idle Coders</span></strong> is a platform for learning and exploring website developing world. We are hardly suggesting you that you will not make any kind of bad use of it.

        <br /><br /><b className=" my-2">Make sure your are follwing these recommendations before submit the contact form :</b>
        <ul className="italic m-2 border-l-3 px-3">
          <li>You are giving your full name according to your NID</li>
          <li>Your mail is active and valid</li>
          <li>Your phone no is active and valid</li>
          <li>You select correct country code</li>
          <li>Write a clear and detailed message about your problems</li>
        </ul>
        <br />Thanks for being with us! <br />-Idle away with us
      </p>
      <br />

      <p className="text-tiny">Copyrights: Idle Coders Official Website and Youtube Channel {`(2024)`}</p>
    </Fragment>
  );
}
