const test = require('node:test');
const assert = require('node:assert/strict');

const {
  bubbleSort,
  insertionSort,
  quickSort,
} = require('./sorting');

const algorithms = {
  bubbleSort,
  insertionSort,
  quickSort,
};

for (const [name, sort] of Object.entries(algorithms)) {
  test(`${name} sorts numbers without mutating the input`, () => {
    const input = [9, -2, 7, 4, 4, 0, 12];
    const original = [...input];

    assert.deepStrictEqual(sort(input), [-2, 0, 4, 4, 7, 9, 12]);
    assert.deepStrictEqual(input, original);
  });

  test(`${name} handles empty and single-item arrays`, () => {
    assert.deepStrictEqual(sort([]), []);
    assert.deepStrictEqual(sort([3]), [3]);
  });

  test(`${name} accepts a custom comparator`, () => {
    const input = ['pear', 'apple', 'orange'];
    const descending = (first, second) => second.localeCompare(first);

    assert.deepStrictEqual(sort(input, descending), ['pear', 'orange', 'apple']);
    assert.deepStrictEqual(input, ['pear', 'apple', 'orange']);
  });
}

test('sorting functions reject non-array input', () => {
  for (const sort of Object.values(algorithms)) {
    assert.throws(() => sort('not an array'), {
      name: 'TypeError',
      message: 'items must be an array',
    });
  }
});

test('sorting functions reject an invalid comparator', () => {
  for (const sort of Object.values(algorithms)) {
    assert.throws(() => sort([2, 1], 'descending'), {
      name: 'TypeError',
      message: 'compare must be a function',
    });
  }
});
