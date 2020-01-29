
import React from "react"
import { Link } from "gatsby"
import { Featured, FeaturedItem,FeaturedItem__content,FeaturedItem__image,FeaturedItem__title } from "../components/molecules/featured/index"
import {Paper,Button,Box,List,ListItem} from "@material-ui/core"
import ExecutiveBoard from "../components/organisms/executiveBoard/index"

import "./sidebar.scss";
let list = [
  {
    name:"history",
    list:[
      "Indian wars",
      "Johnson County",
      "World War 2"
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
    name:"national headquarters",
    description:<>3816 Caroline Street ~ Houston, TX
 

    Now located at the famed Buffalo Soldiers National Museum in Houston, TX. We are delighted to be located in such a prestigious Museum and associated with a great historical heritage. Long overdue, in December 2017 we celebrated the opening of our new home.
    With our new headquarters come the appointment of Our new Executive Director, Lifetime Association member and Chair of our Buffalo Soldier Corp Committee, Michael Theard. Meet Mike:
    
    
    Mr. Theard possesses more than 42-years in Professional Services and nearly 15 years’ experience supporting DHS/FEMA programs; initially as a project manager for end user services office buildouts, then as the FEMA/NCP contract PM responsible for monitoring, reviewing, reporting and budgeting preparation and execution functions for FEMA NCP, specifically within the Business Management and Continuity Communications Divisions’ PAMSS task orders; he possesses in-depth experience initiating, planning, implementing, and closing out several of the DHS Headquarters office location build out projects with emphasis on technology services throughout the National Capital Region. His efforts resulted in office, conference, and training space for the HQ DHS Offices of Human Capital, Legislative Affairs, Labor Relations, Procurement, Transformation, Infrastructure Management, Counter Intelligence, Security, Domestic Preparedness, and FEMA National Preparedness and Grants Programs.
     
    
    In addition to his Buffalo Soldier Corp responsibilities, Mike will oversee all National Headquarters activities, grants and fundraising projects. We are truly honored that Mike accepted this appointment from the National Executive Board. 
     </>
  },
  {
    name:"our mission",
    description:<>
MISSION STATEMENT
The GSAAC is dedicated to preserving the legacy of the Buffalo Soldiers of the United States by informing, educating, and engaging the community, especially Black youth, reinforcing the tremendous and often forgotten impact of these brave soldiers’ achievements past, present and future.

The GSAAC, through education, community service and outreach programs in researching, interpreting, collecting displaying, and preserving historical artifacts and documents.

OBJECTIVES
To cement and strengthen the friendships and loyalties of all persons who have served, are now serving, or may hereafter serve in time of peace or in time of war.
To perpetuate the memory of comrades who have passed on and to perpetuate the history of the many accomplishments of the Ninth and Tenth Cavalry Regiments and Twenty-Fourth and Twenty-Fifth Infantry Regiments in the defense of our country.
To stimulate critical thinking in the minds of our youth by encouraging them to study and understand the contributions of Blacks to the military history of our nation.
To promote community service to the nation and Southern Arizona by setting an example of unselfish patriotism.
    </>
  },
  {
    name:"executive board",
    description:<ExecutiveBoard cols={4}/>
  },
  {
    name:"Hall of honor",
    description:<>
    Hall Of Honor
We are truly honored to share with you are Hall of Honor which showcases our living Original Buffalo Soldiers.  They are why we do what we do.  We strive to honor and salute their BRAVE service to our country as well as their tremendous accomplishments. They have given in ways we all can be truly proud of! 
 

A Glorious Past…… Blazing Brilliant FutureBS png1
(Click on  the name to see the Bio)

Trooper Andrew Aaron Jr.
Trooper James H. Alexander
Trooper Porter F. Banks
Trooper James L. Braxton Jr. 
Trooper Robert L. Bruton Jr.                                                        
Trooper Fred L. Cartha
Trooper Harold S. Cole
Trooper James Cooper
Trooper Turl Covington Jr.
Trooper Albert Curly
Trooper Bruce E. Dennis
Trooper John J. Nichols
Trooper George Booth Smith
Trooper William M. Decatur
Trooper Waldo Henderson
Trooper Andrew Q. Isaacs
Trooper Henri A. LeGendre
Trooper Wallace Lott
Trooper James G. Madison
Trooper Vernon M. McDonald
Trooper Frank L. Miller
Trooper Darrel Nash
Trooper Andrew N. Winfree
Trooper Curtis D. Womack
Trooper Willie G. Bailey
Trooper Albert N. Jones
Trooper Milton J. Taylor
Trooper Emmett Tucker Sr.
Trooper Reuben T. Hamilton
</>
  },
]
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page:0}
        this.setPage = (page)=>{
          this.setState({page})
        }
    }

    render() {
        return (
            <Main sidebar = {<List>
        {list.map((e,i)=><><ListItem selected = {this.state.page==i} button onClick = {()=>{this.setPage(i)}} component="a" href='#test'>{e.name}
            
            </ListItem>
            {e.list?<div style = {{paddingLeft:"24px"}}>
              <List>{e.list.map((e2)=><ListItem button component="a" href='#test'>{e2}</ListItem>)}</List>
            </div>:""}
            </>)}


            </List>}>
            <Section name = "intro" classes={['-transparent']}>
            <Box p = {2}><Paper><Box p = {4}>
             {list[this.state.page].description}
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