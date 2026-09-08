const numberCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const assertArray = (items) => {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }
};

const assertFiniteNumbers = (items) => {
  for (let index = 0; index < items.length; index += 1) {
    if (!Number.isFinite(items[index])) {
      throw new TypeError(
        `items[${index}] must be a finite number when compare is omitted`,
      );
    }
  }
};

const resolveCompare = (compare, items) => {
  if (compare === undefined) {
    assertFiniteNumbers(items);
    return numberCompare;
  }
  if (typeof compare !== 'function') {
    throw new TypeError('compare must be a function');
  }

  return (first, second) => {
    const result = compare(first, second);
    if (typeof result !== 'number' || !Number.isFinite(result)) {
      throw new TypeError('compare must return a finite number');
    }
    return result;
  };
};

const swap = (items, first, second) => {
  if (first === second) return;

  const temporary = items[first];
  items[first] = items[second];
  items[second] = temporary;
};

const bubbleSort = (items, compare) => {
  assertArray(items);
  const compareItems = resolveCompare(compare, items);
  const result = [...items];

  for (let end = result.length - 1; end > 0; end -= 1) {
    let swapped = false;

    for (let index = 0; index < end; index += 1) {
      if (compareItems(result[index], result[index + 1]) > 0) {
        swap(result, index, index + 1);
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return result;
};

const insertionSort = (items, compare) => {
  assertArray(items);
  const compareItems = resolveCompare(compare, items);
  const result = [...items];

  for (let index = 1; index < result.length; index += 1) {
    const current = result[index];
    let position = index - 1;

    while (position >= 0 && compareItems(result[position], current) > 0) {
      result[position + 1] = result[position];
      position -= 1;
    }

    result[position + 1] = current;
  }

  return result;
};

const quickSort = (items, compare) => {
  assertArray(items);
  const compareItems = resolveCompare(compare, items);
  const result = [...items];
  const ranges = [[0, result.length - 1]];

  while (ranges.length > 0) {
    const [start, end] = ranges.pop();
    if (start >= end) continue;

    const pivot = result[Math.floor((start + end) / 2)];
    let smaller = start;
    let current = start;
    let greater = end;

    while (current <= greater) {
      const order = compareItems(result[current], pivot);

      if (order < 0) {
        swap(result, smaller, current);
        smaller += 1;
        current += 1;
      } else if (order > 0) {
        swap(result, current, greater);
        greater -= 1;
      } else {
        current += 1;
      }
    }

    const leftSize = smaller - start;
    const rightSize = end - greater;

    if (leftSize > rightSize) {
      if (start < smaller - 1) ranges.push([start, smaller - 1]);
      if (greater + 1 < end) ranges.push([greater + 1, end]);
    } else {
      if (greater + 1 < end) ranges.push([greater + 1, end]);
      if (start < smaller - 1) ranges.push([start, smaller - 1]);
    }
  }

  return result;
};

module.exports = {
  bubbleSort,
  insertionSort,
  quickSort,
};

if (require.main === module) {
  const sample = [9, -2, 7, 4, 4, 0, 12];
  console.log('原数组:', sample);
  console.log('冒泡排序:', bubbleSort(sample));
  console.log('插入排序:', insertionSort(sample));
  console.log('快速排序:', quickSort(sample));
}
