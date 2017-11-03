let folderId = "";
let sites = [];
let i = 0;

function makeIndent(indentLength) {
  return ".".repeat(indentLength);
}

function getFolderId(bookmarkItem, indent) {
  if (bookmarkItem.title === "abf") {
    folderId = bookmarkItem.id;
  }
  if (bookmarkItem.children) {
    for (child of bookmarkItem.children) {
      getFolderId(child, indent);
    }
  }
  indent--;
}

function getBookmarkList(bookmarkItem){
  if (bookmarkItem.url) {
    console.log(bookmarkItem.url);
    sites.push(bookmarkItem.url);
  }
  if (bookmarkItem.children) {
    for (child of bookmarkItem.children) {
      getBookmarkList(child);
    }
  }
}

function logBookmarkTree(bookmarkItems) {
  getFolderId(bookmarkItems[0], 0);
}

function logSites(bookmarkItems){
  getBookmarkList(bookmarkItems[0]);
}

function onRejected(error) {
  console.log(`An error: ${error}`);
}

function update(){
  browser.tabs.update({url: sites[i]});
  console.log("Now on site: ", sites[i]);
  i = (i + 1) % sites.length;
}

async function main(){
  // get abf folder id
  let bookmarkTree = browser.bookmarks.getTree();
  bookmarkTree.then(logBookmarkTree, onRejected);
  await bookmarkTree;
  console.log("abf folder id: " + folderId);

  // get bookmark list from abf subtree
  let abfTree = browser.bookmarks.getSubTree(folderId);
  abfTree.then(logSites, onRejected);
  await abfTree;
}

main();
// update tab
browser.browserAction.onClicked.addListener(update);