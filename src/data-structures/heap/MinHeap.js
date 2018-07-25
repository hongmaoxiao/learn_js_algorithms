import Comparator from '../../utils/comparator';

export default class MinHeap {
  constructor(comparatorFunction) {
    // Array representation of the heap.
    this.heapContainer = [];

    this.compare = new Comparator(comparatorFunction);
  }

  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }

  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  peek() {
    return (this.heapContainer.length && this.heapContainer[0]) || null;
  }

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

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while(this.hasParent(currentIndex) && this.compare.lessThan(this.heapContainer[currentIndex], this.parent[currentIndex])) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown(customStartIndex) {
    let currentIndex = customStartIndex || 0;

    while(this.hasRightChild(currentIndex) && this.compare.greaterThan(this.heapContainer[currentIndex], this.heapContainer[this.getRightChildIndex(currentIndex)])) {
      this.swap(currentIndex, this.getRightChildIndex(currentIndex));
      currentIndex = this.getRightChildIndex(currentIndex);
    }

    while(this.hasLeftChild(currentIndex) && this.compare.greaterThan(this.heapContainer[currentIndex], this.heapContainer[this.getLeftChildIndex(currentIndex)])) {
      this.swap(currentIndex, this.getLeftChildIndex(currentIndex));
      currentIndex = this.getLeftChildIndex(currentIndex);
    }

    let nextIndex = null;

    while(this.hasLeftChild(currentIndex)) {
      if (this.hasRightChild(currentIndex) && this.compare.lessThan(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
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

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }
}

