import { useState, CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(54, 215, 183)",
};

function Spinner(props) {
  let [color, setColor] = useState("rgb(54, 215, 183)");

  return (
    <div className="sweet-loading">
      <BounceLoader color={color} loading={props.loading} css={override} size={100} />
    </div>
  );
}

export default Spinner;