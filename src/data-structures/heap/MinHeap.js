import Comparator from '../../utils/comparator/Comparator';

export default class MinHeap {
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    // Array representation of the heap.
    this.heapContainer = [];

    this.compare = new Comparator(comparatorFunction);
  }

  /**
    * @param {number} parentIndex
    * @return {number}
    */
  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }

  /**
     * @param {number} parentIndex
     * @return {number}
     */
  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }

  /**
   * @param {number} childIndex
   * @return {number}
   */
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
     * @param {number} childIndex
     * @return {boolean}
     */
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * @param {number} parentIndex
   * @return {boolean}
   */
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
     * @param {number} parentIndex
     * @return {boolean}
     */

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
     * @param {number} parentIndex
     * @return {*}
     */
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
     * @param {number} parentIndex
     * @return {*}
     */
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
     * @param {number} childIndex
     * @return {*}
     */
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
     * @param {number} indexOne
     * @param {number} indexTwo
     */
  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  /**
     * @return {*}
     */
  peek() {
    return (this.heapContainer.length && this.heapContainer[0]) || null;
  }

  /**
   * @return {*}
   */
  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }

  /**
   * @param {*} item
   * @return {MinHeap}
   */
  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  /**
   * @param {*} item
   * @param {Comparator} [customFindingComparator]
   * @return {MinHeap}
   */
  remove(item, customFindingComparator) {
    const customComparator = customFindingComparator || this.compare;
    const numberOfItemsToRemove = this.find(item, customComparator);

    for (let index = 0; index < numberOfItemsToRemove.length; index += 1) {
      const indexToRemove = this.find(item, customComparator).pop();

      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        const parentItem = this.hasParent(indexToRemove) ? this.parent(indexToRemove) : null;
        const leftItem = this.hasLeftChild(indexToRemove) ? this.leftChild(indexToRemove) : null;

        if (
          leftItem !== null
          && (
            (parentItem === null)
            || customComparator.lessThan(parentItem, this.heapContainer[indexToRemove])
          )
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * @param {*} item
   * @param {Comparator} [customComparator]
   * @return {Number[]}
   */
  find(item, customComparator) {
    const foundItemIndices = [];
    const comparator = customComparator || this.compare;

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex)
      && this.compare.lessThan(this.heapContainer[currentIndex], this.parent(currentIndex))
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * @param {number} [customStartIndex]
   */
  heapifyDown(customStartIndex) {
    let currentIndex = customStartIndex || 0;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex)
        && this.compare.lessThan(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.compare.lessThan(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.heapContainer.length;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.heapContainer.toString();
  }
}
