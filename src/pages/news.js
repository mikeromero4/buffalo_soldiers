
import React from "react"
import { Link } from "gatsby"
import { Featured, FeaturedItem,FeaturedItem__content,FeaturedItem__image,FeaturedItem__title } from "../components/molecules/featured/index"
import {Paper,Button,Box,List,ListItem} from "@material-ui/core"
import ExecutiveBoard from "../components/organisms/executiveBoard/index"

import "./sidebar.scss";
let list = [
  {
    name:"News Bulletin", 
   list :[
      {
        name:"post1",
        description:"this is my first post"
      },
      {
        name:"post2",
        description:"and this is my second post"
      }
   ],
   
    description:<> <h1>Buffalo Soldier History</h1>
    <p>Buffalo Soldiers were members of the 10th Cavalry Regiment of the United States Army. This nickname was given to the Black Cavalry by Native American tribes who fought in the Indian Wars. The term eventually became synonymous with all of the African-American regiments formed in 1866</p>
   <img style = {{float:"left",marginRight:"24px"}} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Buffalo_soldiers1.jpg/375px-Buffalo_soldiers1.jpg"/> During the Civil War, the U.S. government formed regiments known as the United States Colored Troops, composed of black soldiers and Native Americans. The USCT was disbanded in the fall of 1865. In 1867 the Regular Army was set at ten regiments of cavalry and 45 regiments of infantry. The Army was authorized to raise two regiments of black cavalry (the 9th and 10th (Colored) Cavalry) and four regiments of black infantry (the 38th, 39th, 40th, and 41st (Colored) Infantry), who were mostly drawn from USCT veterans. The first draft of the bill that the House Committee on Military Affairs sent to the full chamber on March 7, 1866 did not include a provision for regiments of black cavalry, however, this provision was added by Senator Benjamin Wade prior to the bill's passing on July 28, 1866.[8] In 1869 the Regular Army was kept at ten regiments of cavalry but cut to 25 regiments of Infantry, reducing the black complement to two regiments (the 24th and 25th (Colored) Infantry). The 38th and 41st were reorganized as the 25th, with headquarters in Jackson Barracks in New Orleans, Louisiana, in November 1869. The 39th and 40th were reorganized as the 24th, with headquarters at Fort Clark, Texas, in April 1869. The two black infantry regiments represented 10 percent of the size of all twenty-five infantry regiments. Similarly, the two black cavalry units represented 20 percent of the size of all ten cavalry regiments.[8]

During the peacetime formation years (1865-1870), the black infantry and cavalry regiments were composed of black enlisted soldiers commanded by white commissioned officers and black noncommissioned officers. These included the first commander of the 10th Cavalry Benjamin Grierson, the first commander of the 9th Cavalry Edward Hatch, Medal of Honor recipient Louis H. Carpenter, Nicholas M. Nolan. The first black commissioned officer to lead the Buffalo Soldiers and the first black graduate of West Point, was Henry O. Flipper in 1877.

From 1870 to 1898 the total strength of the US Army totaled 25,000 service members with black soldiers maintaining their 10 percent representation.[8]

History
 </>
  },

  {
    name:"Chaplains corner",
    description:<>3816 Caroline Street ~ Houston, TX
 

    Now located at the famed Buffalo Soldiers National Museum in Houston, TX. We are delighted to be located in such a prestigious Museum and associated with a great historical heritage. Long overdue, in December 2017 we celebrated the opening of our new home.
    With our new headquarters come the appointment of Our new Executive Director, Lifetime Association member and Chair of our Buffalo Soldier Corp Committee, Michael Theard. Meet Mike:
    
    
    Mr. Theard possesses more than 42-years in Professional Services and nearly 15 years’ experience supporting DHS/FEMA programs; initially as a project manager for end user services office buildouts, then as the FEMA/NCP contract PM responsible for monitoring, reviewing, reporting and budgeting preparation and execution functions for FEMA NCP, specifically within the Business Management and Continuity Communications Divisions’ PAMSS task orders; he possesses in-depth experience initiating, planning, implementing, and closing out several of the DHS Headquarters office location build out projects with emphasis on technology services throughout the National Capital Region. His efforts resulted in office, conference, and training space for the HQ DHS Offices of Human Capital, Legislative Affairs, Labor Relations, Procurement, Transformation, Infrastructure Management, Counter Intelligence, Security, Domestic Preparedness, and FEMA National Preparedness and Grants Programs.
     
    
    In addition to his Buffalo Soldier Corp responsibilities, Mike will oversee all National Headquarters activities, grants and fundraising projects. We are truly honored that Mike accepted this appointment from the National Executive Board. 
     </>
  },
  {
    name:"Annual Newsletter",
    description:"test"
  },
]
export default class few extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page:[0]}
        this.setPage = (page)=>{
          this.setState({page})
        }
    }

    render() {
      let{state:{page},setPage} = this
        return (
            <Main sidebar = {<DynamicList {...{page,setPage} }/>}>
            <Section name = "intro" classes={['-transparent']}>
            <Box p = {2}><Paper><Box p = {4}>
            <Content {...{page}}/>
         </Box></Paper></Box>
            </Section>
            
            </Main>
        );
    }
};
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

function  DynamicList({page,setPage}) {
  return <List>
  {list.map((e,i)=><><ListItem selected = {page[0]==i} button onClick = {()=>{setPage([i])}} component="a" href='#test'>{e.name}
      
      </ListItem>
      {e.list?<div style = {{paddingLeft:"24px"}}>
        <List>{e.list.map((e2,i2)=><ListItem selected = {page[1]==i2} button onClick = {()=>{setPage([i,i2])}} component="a" href='#test'>{e2.name}</ListItem>)}</List>
      </div>:""}
      </>)}


      </List>
}
function Content({page}) {
if (page.length==1){
  return list[page[0]].description
}
  return list[page[0]].list[page[1]].description

}