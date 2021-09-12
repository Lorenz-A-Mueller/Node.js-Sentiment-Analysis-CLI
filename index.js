import fs from 'node:fs';
import monkeyLearn from 'monkeylearn';
import getPercentages from './getPercentages.js';

const ml = new monkeyLearn('3853810e1ef91b00d865292289d995a85c68af28');
const modelId = 'cl_pi3C7JiL';

let wholeText = []; // an array filled with wholeTextContent
let wholeTextContent = ''; // a string containing all words separated by whitespace
const singleWords = []; // an array containing all the words as arrays with one element [[word1], [word2], ...]
export let confidence; // the value from the API for the wholeText
export const sentimentValues = []; // an array of all the sentiment results from the singleWords input

// check whether first input value ends in ".txt"

if (/\.txt$/.test(process.argv[2])) {
  wholeTextContent = fs.readFileSync('./' + process.argv[2], {
    encoding: 'utf8',
  });

  // if not, construct data from the process.argv array
} else {
  for (let i = 2; i < process.argv.length; i++) {
    wholeTextContent = wholeTextContent + ' ' + process.argv[i]; // chain all the words and separate by whitespace
  }
  wholeTextContent = wholeTextContent.slice(1); // remove first whitespace
}
wholeText = [wholeTextContent]; // pack into array
console.log(wholeText);

wholeTextContent.split(' ').forEach((word) => {
  return singleWords.push([word]);
});
console.log(singleWords); // [[word1], [word2], ...]

// get API data

// first: the confidence value for the wholeText

ml.classifiers.classify(modelId, wholeText).then((res) => {
  confidence = res.body[0].classifications[0].confidence;
});

// second: get the sentiment value of every word (= of every array inside the singleWords array) - call the API for every word separately
// this way, we get the individual responses and can calculate percentage value for negative, neutral, and positive.

for (let j = 0; j < singleWords.length; j++) {
  ml.classifiers
    .classify(modelId, singleWords[j])
    .then((res) => {
      sentimentValues.push(res.body[0].classifications[0].tag_name); // push all the values to sentimentValues (order is not important)
    })
    .then(() => {
      if (sentimentValues.length === singleWords.length) {
        // when the last value has been loaded
        getPercentages();
      }
    });
}
