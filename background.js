//TODO a lot of stuff
var i = 0;
var sites = [];
function makeIndent(indentLength) {
  return ".".repeat(indentLength);
}

function logItems(bookmarkItem, indent) {
	
  if (bookmarkItem.url) {
    console.log(makeIndent(indent) + bookmarkItem.url);
	sites.push(bookmarkItem.url);
	//browser.tabs.update({url: bookmarkItem.url});
  } else {
    console.log(makeIndent(indent) + "Folder:     " + bookmarkItem.id);
    indent++;
  }
  if (bookmarkItem.children) {
    for (child of bookmarkItem.children) {
      logItems(child, indent);
    }
  }
  indent--;
}

function logTree(bookmarkItems) {
  logItems(bookmarkItems[0], 0);
  tabchg();
}

function onRejected(error) {
  console.log(`An error: ${error}`);
}

function tabchg(){
	console.log("******", sites[i]);
	browser.tabs.update({url: sites[i]});	
	i++;
}
var currentTab;
var currentBookmark;

function main() {
	var gettingTree = browser.bookmarks.getSubTree("2czw911m5qMw");
	gettingTree.then(logTree, onRejected);
}

browser.browserAction.onClicked.addListener(main);