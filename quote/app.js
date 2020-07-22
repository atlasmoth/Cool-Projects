const dataStore = {
  [Symbol.asyncIterator]: function* () {
    while (this.counter < 100) {
      this.counter++;

      yield Promise.resolve(this.counter);
    }
  },
  counter: 0,
};

(async () => {
  for await (let x of dataStore) {
    console.log(await x);
  }
})();
