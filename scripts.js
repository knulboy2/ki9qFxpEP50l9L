/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"LPB211iMSXDT7fdk","label":"reddit","bookmarks":[{"id":"WQhwemrcajM6Ez5I","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"nVx2mmI05Go4y3pY","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"nQVPon0w046yZ80b","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"C32uBuSWgu1bzax0","label":"design tools","bookmarks":[{"id":"I9iIIXrRIpVKSuPp","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"XPrJ3OsgM2y56t0m","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"f2OA096zFoXaBPrD","label":"haikei","url":"https://app.haikei.app/"},{"id":"vsZkIN7Cqs647idI","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"vE0pLpmX2kxlnBtG","label":"worth reading","bookmarks":[{"id":"lXUt4sRecH3TLPYi","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"Dp2ovthuSzJQdb20","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"d5wdB80nxZYAzJjR","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"n9dBRrB5jYvB1z0M","label":"sources","bookmarks":[{"id":"CNi6f2zqoMBuBjfs","label":"icons","url":"https://feathericons.com/"},{"id":"9SkmmrEfNv3aKRq0","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"FVa0Y8xzuFat45nm","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"a3JqH9ooWItQb8Gg","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
