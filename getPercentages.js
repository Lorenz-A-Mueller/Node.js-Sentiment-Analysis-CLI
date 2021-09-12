import { confidence, sentimentValues } from './index.js';

let numberOfPositives = 0;
let numberOfNeutrals = 0;
let numberOfNegatives = 0;
let positivePercentage = 0;
let neutralPercentage = 0;
let negativePercentage = 0;

export default function getPercentages() {
  // increment the variables according to the content of sentimentValues

  sentimentValues.forEach((value) => {
    if (value === 'Positive') {
      return (numberOfPositives += 1);
    } else if (value === 'Neutral') {
      return (numberOfNeutrals += 1);
    } else {
      return (numberOfNegatives += 1);
    }
  });

  // calculate Percentages and trim to 2 decimal digits

  positivePercentage = (
    (numberOfPositives / sentimentValues.length) *
    100
  ).toFixed(2);
  neutralPercentage = (
    (numberOfNeutrals / sentimentValues.length) *
    100
  ).toFixed(2);
  negativePercentage = (
    (numberOfNegatives / sentimentValues.length) *
    100
  ).toFixed(2);

  // output

  console.log(`Your text has the following sentiment (with ${
    confidence * 100
  }% certainty):
  - ${positivePercentage}% positive
  - ${neutralPercentage}% neutral
  - ${negativePercentage}% negative`);
  return;
}
