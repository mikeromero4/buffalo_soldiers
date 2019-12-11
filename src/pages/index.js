import React from "react"
import { Link } from "gatsby"
import { Featured, FeaturedItem } from "../components/molecules/featured/index"
import SEO from "../components/utilities/seo"
import {Button,Box} from "@material-ui/core"
import PresidentsPen from "../content/presidentsPen/index"

import ExecutiveBoard from "../components/organisms/executiveBoard/index"

import "./sidebar.scss";
export default () => (
  <>
    <SEO title="Home" />
    <Section name = "intro" classes={['-transparent']}>
      <Intro />
    </Section>
    <WideBox>
      <CallToAction/>
    </WideBox>
    <Section name = "featured" classes={['-transparent']} sidebar = {<FeaturedPreviews />}>
      <PresidentsPen />
    </Section>
    <ExecutiveBoard/>
  </>
)
function WideBox(props) {
return<div className = "t-wideBox">
  {props.children}
</div>

}
 function CallToAction() {
   return <Box p={2} textAlign='center'>
   <p>
     The National Association is comprised of many Chartered Chapters all
     across the United States.
   </p>

   <Link to="./chapters">
     <Button
       m={4}
       color="secondary"
       variant="contained"
       className="callToAction__button bigButton"
     >
       Find your local Chapter
     </Button>
   </Link>
 </Box>

 }
function FeaturedPreviews() {
  return (
      <Featured>
        <FeaturedItem>News </FeaturedItem>
        <FeaturedItem>Community</FeaturedItem>
        <FeaturedItem></FeaturedItem>
      </Featured>
  )
}
function Section({sidebar,name,children,classes}) {
  if (sidebar){
return <div id = {name} className = {"t-section -withSidebar"
+(classes?' '+classes.reduce((p,c)=>p+c):'')}>
<div className="t-section__sidebar">
{sidebar}
</div>
<div className="t-section__content">
  {children}
</div>
</div>
  }
else return <div id = {name} className = {"t-section"+(classes?' '+classes.reduce((p,c)=>p+c):'')}>{children}</div>
}
function Intro() {
  return (
    <div className="media--large">
      <div className="media__image">
        <img
          className="bg1"
          src="http://realhistoryww.com/world_history/ancient/Misc/Buffalo_soldiers/Indian_96.JPG"
        />
      </div>
      <div className="media__content">
        <div>
          <h2 className='heading--2 heading -primary -special'>
            <span>National</span> 
            <span>Buffalo</span> 
            <span>Soldiers</span></h2>
          <h4 className='heading--4'>The 9th & 10th (Horse) Calvary Association</h4>
          <p>
            The National Association is an official military unit representing
            one of the most famed Military Units in the history of the American
            Armed Forces; <em>The Buffalo Soldiers</em>. Our Mission is to
            perpetuate, educate and celebrate their rich legacy and herritage!
            <a className="importantLink">
              {" "}
              Learn more about Buffalo Soldier History
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
