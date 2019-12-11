import React from "react"
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import StoreIcon from '@material-ui/icons/Store';
import LocationOnIcon from '@material-ui/icons/LocationOn';




const siteMapData = {
  About: [
    "History",
    'executive board',
    'Hall of honor',
    "National headquarters",
    "Privacy Policy",
    
  ],

  News: [
    "News Bulletin",
    "Chaplain's Corner", 
    "Fiddlers Green",
    "newsletter",
],
  Community: [
    "Ladies auxiliary",
    "Junior Buffalo soldiers",
    "Reunion",
    "events",
    "Membership"
  ],

}
let Box = ({children})=><div className = "footerBox">{children}</div>

let footerBoxes =  [
    <Box>Gallery <PhotoLibraryIcon/></Box>,
    <Box>contact  <ContactMailIcon/></Box>,
    <Box>National Headquarters:
    3816 Caroline St, Houston, TX 77004 <LocationOnIcon/></Box>,
    //  "Contact",
    //  "Chapters",
    //  "Donate",
    //  "Store"
]
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
    return <div className="m-siteMap__group">
<span className="m-siteMap__groupName"> {name}</span>
    <ul key = {name} className="m-siteMap__grouplist a-list">
  {data.map(e => <li className = "m-siteMap__listItem a-listItem">{e}</li>)}
  </ul>
  </div>
}
const Copyright = ({name}) => (
  <>
    © {new Date().getFullYear()},{name}
  </>
)

export default () => (
  <footer className="o-footer">
      <div className="o-footer__bar"></div>
<div className = "o-footer__content">
    <SiteMap data={siteMapData} />
    <div className = "o-footer__boxes">{footerBoxes}</div>
    
    <br/>
    </div>
    <Copyright name="National Buffalo Soldiers
The 9th & 10th (Horse) Calvary Association" />
  </footer>
)
