const tweets = [
  'Какой-то странный тред',
  'Твит, адресованный Илону Маску',
  'Ответ на инфоповод'
];

// tweets.forEach((tweet) => {
//     console.log(tweet);
// }); 

function insertTweet(tweet, selector) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Cannot find element ${selector}`);
  }
  element.textContent(tweet);
}

function consoleTweet(tweet) {
    console.log(tweet);
}

tweets.forEach(consoleTweet);