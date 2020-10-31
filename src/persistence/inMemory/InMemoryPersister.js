class InMemoryPersister {
  constructor() {
    console.log('InMemoryPersister constructed');
    this.nextId = new Date().getTime();
  }

  // *********************
  // Account item support
  findAccountItem(query) {
    console.log('InMemoryPersister findAccountItem, query:');
    console.dir(query);
  }

  insertAccountItem(item) {
    console.log('InMemoryPersister insertAccountItem, item:');
    item.id = this.nextId++;
    console.dir(item);
    return item;
  }

  updateAccountItem(itemId, updateObj) {
    console.log(
      `InMemoryPersister updateAccountItem, itemId: ${itemId}, updateObj:`
    );
    console.dir(updateObj);
  }

  // *********************
  // Account category support
  findCategoryItem(query) {
    console.log('InMemoryPersister findCategoryItem query:');
    console.dir(query);
  }

  insertCategoryItem(item) {
    console.log('InMemoryPersister insertCategoryItem, item:');
    item.id = this.nextId++;
    console.dir(item);
    return item;
  }
}

const inMemoryPersister = new InMemoryPersister();
export default inMemoryPersister;
