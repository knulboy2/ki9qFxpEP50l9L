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

const bookmarks = [{"id":"LPB211iMSXDT7fdk","label":"social_media","bookmarks":[{"id":"ElDyFjkdRqdPtqu5","label":"whatsapp","url":"https://web.whatsapp.com/"},{"id":"9OO9BmE3arZKYZ4R","label":"youtube","url":"https://www.youtube.com/"},{"id":"fhvFleFDupj0arhw","label":"twitch","url":"https://www.twitch.tv/"}]},{"id":"Q5xvT6U4txkzi460","label":"school","bookmarks":[{"id":"MrCMDu4OcrzhtdeN","label":"progress","url":"https://progresswww.nl/fontys"},{"id":"vnNayf5EgoCwqHFL","label":"canvas","url":"https://canvas.fontys.nl/"},{"id":"aZM1EIQFX1dtro9e","label":"xedule","url":"https://sa-fontys.xedule.nl/"},{"id":"Hm9c4v7k20kVgzBB","label":"typst","url":"https://typst.app/"}]},{"id":"ZIsuiUcNm3bxnciZ","label":"prototyping","bookmarks":[{"id":"cQ3SNntU2ZKkuoDq","label":"storeroom materials","url":"https://edu.nl/vudbn"},{"id":"1KIraHaZ95WwhYu5","label":"making&prototyping","url":"https://edu.nl/y4epe"}]},{"id":"xUUejBqyLEXGChJC","label":"ai","bookmarks":[{"id":"wIUauIv1kz2fmgTQ","label":"gemini","url":"https://gemini.google.com/"},{"id":"hVg7ECdGPgHb3FAj","label":"chatgpt","url":"https://chatgpt.com/?model=auto"},{"id":"35KxSvc4VfFprvnr","label":"claudeai","url":"https://claude.ai/new"}]},{"id":"5DIexmI9OajsVXyj","label":"mail","bookmarks":[{"id":"skFJJFzOMDokfT5d","label":"vthof.max@gmail.com","url":"https://mail.google.com/mail/u/1/#inbox"},{"id":"T3FEL4dG01GDtw7F","label":"maxvhof@gmail.com","url":"https://mail.google.com/mail/u/2/#inbox"},{"id":"7sZvDnduJsZlctKb","label":"maxoverig@gmail.com","url":"https://mail.google.com/mail/u/0/#inbox"}]}]

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
