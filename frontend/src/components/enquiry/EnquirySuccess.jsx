import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
} from "lucide-react";

import { Link } from "react-router-dom";

const EnquirySuccess = ({
  title,
  result,
  onReset,
}) => {
  return (
    <div className="ael-enquiry-success">
      <span className="ael-enquiry-success__icon">
        <CheckCircle2
          size={40}
        />
      </span>

      <h2>
        {title}
      </h2>

      {result.developmentMode ? (
        <div className="ael-enquiry-success__development">
          <FlaskConical
            size={18}
          />

          <div>
            <strong>
              Frontend Development Mode
            </strong>

            <p>
              The form has passed
              frontend validation, but
              no enquiry has been sent
              because the Laravel API is
              not connected yet.
            </p>
          </div>
        </div>
      ) : (
        <p>
          Your enquiry has been
          submitted successfully. The
          company can now review the
          information provided.
        </p>
      )}

      {result.reference && (
        <div className="ael-enquiry-success__reference">
          Reference

          <strong>
            {result.reference}
          </strong>
        </div>
      )}

      <div className="ael-enquiry-success__actions">
        <button
          type="button"
          onClick={onReset}
        >
          Send Another Enquiry
        </button>

        <Link to="/products">
          Browse Products

          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default EnquirySuccess;