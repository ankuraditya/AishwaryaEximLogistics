import {
  Check,
  PackageCheck,
} from "lucide-react";

const ProductCommercialDetails = ({
  product,
}) => {
  const items = [
    {
      label:
        "Minimum Order Quantity",
      value:
        product.minimumOrderQuantity,
    },

    {
      label:
        "Packaging Information",
      value: product.packaging,
    },

    {
      label:
        "Customisation",
      value:
        product.customisation,
    },
  ].filter(
    (item) =>
      item.value !== undefined &&
      item.value !== null &&
      item.value !== ""
  );

  return (
    <div className="ael-product-commercial">
      <div className="ael-product-section-heading">
        <span>
          Commercial Information
        </span>

        <h2>
          Buyer Requirements
        </h2>

        <p>
          The final quotation depends on
          the confirmed product,
          quantity, specifications,
          packaging and destination.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="ael-product-commercial__provided">
          {items.map((item) => (
            <div key={item.label}>
              <span>
                <Check size={15} />
              </span>

              <div>
                <small>
                  {item.label}
                </small>

                <strong>
                  {item.value}
                </strong>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="ael-product-commercial__request">
          <PackageCheck size={25} />

          <div>
            <strong>
              Commercial information
              available against
              requirement.
            </strong>

            <p>
              Share your required
              quantity, destination and
              product requirements for
              the relevant commercial
              discussion.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCommercialDetails;