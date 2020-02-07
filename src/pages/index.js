import React from "react"
import { Link } from "gatsby"
import { Featured, FeaturedItem,FeaturedItem__content,FeaturedItem__image,FeaturedItem__title } from "../components/molecules/featured/index"
import {Button,Box} from "@material-ui/core"
import PresidentsPen from "../content/presidentsPen/index"
import img1 from "../images/6.jpg"
import ExecutiveBoard from "../components/organisms/executiveBoard/index"
import {Main,Section} from "../components/templates/generic/common"

// import "./sidebar.scss";
import { relative } from "path"
export default () => {

  
  return (<>


     <Main margin >
      <Intro />
      <Box       display="flex"
          flexWrap='wrap-reverse'
// width='max-content'
mx='auto'
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          mt = {4}
        px={2}>
      
    <WideBox>
      <CallToAction/>
    </WideBox> 
    {/* <WideBox>

    <Box>
      We currently have
      289 members.
      Join us now!

      <Button color='secondary' variant='contained'>

      Become a member
      </Button>
    </Box>
    </WideBox> */}
      </Box>
{/* 
    <Section name = "featured" classes={['-transparent']} sidebar = {  <FeaturedPreviews />  }>
      <PresidentsPen />
      <Section name = "intro" classes={['-transparent']}>
      <ExecutiveBoard /></Section>
    
    </Section> */}


    <Section name = "featured" classes={['-transparent']}  >
      <Section name = "intro" classes={['-transparent','-reverse']} smallSidebar sidebar = {<>
      <div style={{
        // width:"250px",
        height:'100%',
        position:'relative',
        overflow:'scroll',
        alignSelf:'stretch'
      }}>
        <div style={{
          position:'absolute'
        }}>
        <ExecutiveBoard />
        </div>

        </div>
              <div style={{
                marginTop: '-40px'
              }}>
                <Link to="./about?page=3">

                <Button color='secondary' variant='contained' fullWidth >Full List</Button>
                </Link>
              </div>
            </>
            }>
      <PresidentsPen />
      </Section>
      <FeaturedPreviews /> 
    
    </Section>
{/* 
    
        <Section name = "featured" classes={['-transparent']}>
      <PresidentsPen />
      
    
    </Section>
<Section name = "intro" classes={['-transparent']}>
      <FeaturedPreviews horizontal/></Section>

    <Section name = "p" classes={['-transparent']}>
      <ExecutiveBoard/>
    
    </Section> */}
    </Main>
    </>
)
}
function WideBox(props) {
return<div className = "t-wideBox">
  {props.children}
</div>

}
 function CallToAction() {
   return <Box py={2} px={4}textAlign='center'>
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
         <FeaturedItem__content> 
            <span>Become a member to participate in our events, reunions and more! </span>
            <Link style={{width:'100%'}} to="./membership"> <Button fullWidth variant='contained' color='secondary'>Learn More</Button></Link>
            </FeaturedItem__content>
        </FeaturedItem>
      <FeaturedItem>
            <FeaturedItem__title> Junior Buffalo Soldiers</FeaturedItem__title>
         <FeaturedItem__image img="https://i0.wp.com/www.910hcav.org/wp-content/uploads/2018/09/Denver-JR-BS-2.jpg?resize=600%2C399&ssl=1"/>
         <FeaturedItem__content>
            <span>Keep the Buffalo Soldier legacy alive through the generations!</span>
           <Link style={{width:'100%'}} to="./junior-buffalo-soldiers"> <Button fullWidth variant='contained' color='secondary'>Learn More</Button></Link>
            </FeaturedItem__content>
        </FeaturedItem>
        <FeaturedItem>
            <FeaturedItem__title> News</FeaturedItem__title>
         <FeaturedItem__image img="https://i0.wp.com/www.910hcav.org/wp-content/uploads/2018/09/Denver-JR-BS-2.jpg?resize=600%2C399&ssl=1"/>
         <FeaturedItem__content>
            <span>Keep updated on current news and events!</span>
          <Link style={{width:'100%'}} to="./events">  <Button fullWidth variant='contained' color='secondary'>Learn More</Button></Link>
            </FeaturedItem__content>
        </FeaturedItem>

      </Featured>
  )
}
function Intro() {
  return (
    <div className="media--large">
      <div className="media__image">
        <img
          className="bg1"
          src={img1}
        />
      </div>
      <div className="media__content">
        <div className='content_title'>
          <h2 className='heading--2 heading -secondary heading--special1'>
            National Buffalo Soldiers</h2>
          <h4 className='heading--4 heading -white'>The 9th & 10th (Horse) Calvary Association</h4>
           </div>
           <div  className='content_body'>
        <span>
            The National Association is an official military unit representing
            one of the most famed Military Units in the history of the American
            Armed Forces; <em>The Buffalo Soldiers</em>. Our Mission is to
            perpetuate, educate and celebrate their rich legacy and herritage!
            </span>
            <Link className="importantLink" to="./about">
              <Button variant='outlined' color='secondary'>

              Learn more about Buffalo Soldier History
              </Button>
            </Link>
        </div>

      </div>
    </div>
  )
}
