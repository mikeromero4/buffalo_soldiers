import React from "react"

const siteMapData = {
  About: [
    "National headquarters",
    "Hall of honor",
    "High tea",
    "Fiddlers Green",
  ],
  News: ["Presidents Pen", "Chaplain's Corner", "newsletter"],
  "Community and events": [
    "Ladies auxiliary",
    "Junior Buffalo soldiers",
    "Reunion",
    "events",
  ],
  misc: ["gallery", "Contact", "Membership", "Chapters", "Donate", "Store"],
}
function SiteMap({ data }) {
    let siteMap = []
    for (const list in data) {
        if (data.hasOwnProperty(list)) {
            siteMap.push(<List name = {list} data = {data[list]}/>)
        }
    }
  return (
    <div className="m-siteMap">
      {siteMap}
    </div>
  )
}
function List({ data,name }) {
    return <>
<span> {name}</span>
    <ul key = {name} className="m-siteMap__item a-listItem">
  {data.map(e => <li>{e}</li>)}
  </ul>
  </>
}
const Copyright = ({name}) => (
  <>
    © {new Date().getFullYear()},<a href="./">{name}</a>
  </>
)
export default () => (
  <footer className="footer">
    <Copyright name="Buffalo Soldiers Association" />
    <SiteMap data={siteMapData} />
  </footer>
)
