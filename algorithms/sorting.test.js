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

  test(`${name} handles common ordering edge cases`, () => {
    const cases = [
      { input: [], expected: [] },
      { input: [3], expected: [3] },
      { input: [1, 2, 3, 4], expected: [1, 2, 3, 4] },
      { input: [4, 3, 2, 1], expected: [1, 2, 3, 4] },
      { input: [5, 5, 5, 5], expected: [5, 5, 5, 5] },
      { input: [3, 1, 3, 2, 1, 3], expected: [1, 1, 2, 3, 3, 3] },
    ];

    for (const { input, expected } of cases) {
      const original = [...input];
      assert.deepStrictEqual(sort(input), expected);
      assert.deepStrictEqual(input, original);
    }
  });

  test(`${name} accepts a custom comparator`, () => {
    const input = ['pear', 'apple', 'orange'];
    const descending = (first, second) => second.localeCompare(first);

    assert.deepStrictEqual(sort(input, descending), ['pear', 'orange', 'apple']);
    assert.deepStrictEqual(input, ['pear', 'apple', 'orange']);
  });
}

test('bubbleSort and insertionSort preserve the order of equal items', () => {
  const stableAlgorithms = { bubbleSort, insertionSort };
  const input = [
    { key: 2, id: 'a' },
    { key: 1, id: 'b' },
    { key: 2, id: 'c' },
    { key: 1, id: 'd' },
  ];
  const compareByKey = (first, second) => first.key - second.key;

  for (const sort of Object.values(stableAlgorithms)) {
    const result = sort(input, compareByKey);
    assert.deepStrictEqual(result.map((item) => item.id), ['b', 'd', 'a', 'c']);
  }

  assert.deepStrictEqual(input.map((item) => item.id), ['a', 'b', 'c', 'd']);
});

test('quickSort sorts duplicate objects without losing items', () => {
  const input = [
    { key: 2, id: 'a' },
    { key: 1, id: 'b' },
    { key: 2, id: 'c' },
    { key: 1, id: 'd' },
    { key: 3, id: 'e' },
  ];
  const original = input.map((item) => ({ ...item }));
  const result = quickSort(input, (first, second) => first.key - second.key);

  assert.deepStrictEqual(result.map((item) => item.key), [1, 1, 2, 2, 3]);
  assert.deepStrictEqual(
    result.map((item) => item.id).sort(),
    ['a', 'b', 'c', 'd', 'e'],
  );
  assert.deepStrictEqual(input, original);
});

test('quickSort handles large ordered and reverse-ordered arrays', () => {
  const size = 20000;
  const ordered = Array.from({ length: size }, (_, index) => index);
  const reversed = [...ordered].reverse();

  assert.deepStrictEqual(quickSort(ordered), ordered);
  assert.deepStrictEqual(quickSort(reversed), ordered);
  assert.deepStrictEqual(ordered, Array.from({ length: size }, (_, index) => index));
  assert.deepStrictEqual(reversed, [...ordered].reverse());
});

test('sorting functions reject non-array input', () => {
  for (const sort of Object.values(algorithms)) {
    assert.throws(() => sort('not an array'), {
      name: 'TypeError',
      message: 'items must be an array',
    });
  }
});

test('default numeric sorting rejects invalid item values', () => {
  const invalidInputs = [
    [3, Number.NaN, 2],
    [Number.POSITIVE_INFINITY, 1],
    ['3', 2],
    [3, null],
    [Number.NaN],
  ];
  const sparse = [];
  sparse[1] = 2;
  invalidInputs.push(sparse);

  for (const sort of Object.values(algorithms)) {
    for (const input of invalidInputs) {
      const invalidIndex = input.findIndex((item) => !Number.isFinite(item));
      assert.throws(() => sort(input), {
        name: 'TypeError',
        message: `items[${invalidIndex}] must be a finite number when compare is omitted`,
      });
    }
  }
});

test('sorting functions reject invalid comparator results', () => {
  const invalidResults = [Number.NaN, Number.POSITIVE_INFINITY, 'invalid', undefined];

  for (const sort of Object.values(algorithms)) {
    for (const invalidResult of invalidResults) {
      assert.throws(() => sort([2, 1], () => invalidResult), {
        name: 'TypeError',
        message: 'compare must return a finite number',
      });
    }
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
