import "./Stripe.css";
import { winConditions } from "../../../../game-table";

function Stripe({ winnerPattern }) {
  const patternAsString = winnerPattern.toString();
  const pattern =
    winConditions.findIndex(
      (element) => element.toString() === patternAsString
    ) + 1;
  console.log(pattern)
  console.log(winnerPattern)

  return (
    <div
      className={`custom-stripe ${
        pattern < 7 ? "stripe-direction_flat" : "stripe-direction_diagonal"
      } pattern-${pattern}`}
    ></div>
  );
}

export default Stripe;
