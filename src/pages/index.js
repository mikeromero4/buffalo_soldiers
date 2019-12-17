import React from "react"
import { Link } from "gatsby"
import { Featured, FeaturedItem,FeaturedItem__content,FeaturedItem__image,FeaturedItem__title } from "../components/molecules/featured/index"
import {Button,Box} from "@material-ui/core"
import PresidentsPen from "../content/presidentsPen/index"

import ExecutiveBoard from "../components/organisms/executiveBoard/index"

import "./sidebar.scss";
export default () => (
   <>


     <Main>
     <Section name = "intro" classes={['-transparent']}>
      <Intro />
    </Section>
     <WideBox>
      <CallToAction/>
    </WideBox>
{/* 
    <Section name = "featured" classes={['-transparent']} sidebar = {  <FeaturedPreviews />  }>
      <PresidentsPen />
      <Section name = "intro" classes={['-transparent']}>
      <ExecutiveBoard /></Section>
    
    </Section> */}


    {/* <Section name = "featured" classes={['-transparent']}  sidebar = {<ExecutiveBoard />}>
      <PresidentsPen />
      <Section name = "intro" classes={['-transparent']}>
      <FeaturedPreviews /> </Section>
    
    </Section> */}

    
        <Section name = "featured" classes={['-transparent']}>
      <PresidentsPen />
      
    
    </Section>
<Section name = "intro" classes={['-transparent']}>
      <FeaturedPreviews horizontal/></Section>

    <Section name = "p" classes={['-transparent']}>
      <ExecutiveBoard/>
    
    </Section>
    </Main>
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
function FeaturedPreviews({horizontal}) {
  return (
      <Featured horizontal={horizontal}>
        <FeaturedItem>
        <FeaturedItem__title> Membership</FeaturedItem__title>
         <FeaturedItem__image img='https://i1.wp.com/www.910hcav.org/wp-content/uploads/2016/09/Atanta-Chp.jpg?w=700'/>
         <FeaturedItem__content> Become a member to participate in our events, reunions and more! </FeaturedItem__content>
        </FeaturedItem>
      <FeaturedItem>
        <FeaturedItem__title> Junior Buffalo Soldiers</FeaturedItem__title>
         <FeaturedItem__image img="https://i0.wp.com/www.910hcav.org/wp-content/uploads/2018/09/Denver-JR-BS-2.jpg?resize=600%2C399&ssl=1"/>
         <FeaturedItem__content>Keep the Buffalo Soldier legacy alive through the generations!</FeaturedItem__content>
        </FeaturedItem>
                <FeaturedItem>
        <FeaturedItem__title> News</FeaturedItem__title>
         <FeaturedItem__image img='https://i1.wp.com/www.910hcav.org/wp-content/uploads/2016/09/Atanta-Chp.jpg?w=700'/>
         <FeaturedItem__content> Stay updated on current events and updates. </FeaturedItem__content>
        </FeaturedItem>
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
function Main({children,sidebar}) {
  return <main className={"t-main" + (sidebar?" -withSidebar":"")}>
    {sidebar?<div className = "t-main__sidebar">{sidebar}</div>:""}
    <div className = "t-main__content">{children}</div>
  </main>
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
          <h2 className='heading--2 heading -secondary -special'>
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
