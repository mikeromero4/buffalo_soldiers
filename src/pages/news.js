
import React from "react"
import ContentPage from '../components/templates/contentPages/index'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {Paper,Box,List,Button} from "@material-ui/core"
import {Link} from "gatsby"
import { Document, Page, Outline } from 'react-pdf';
import pdf1 from "../content/pdfs/t1.pdf"
class PdfViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
    this.onDocumentLoadSuccess=({numPages })=>{
      this.setState({pages:numPages })
    }
  }

  render() {
    const {url} = this.props;
    let pages=[]
    if(this.state.pages){
      for(let i=1;i<this.state.pages;i++){
        pages.push(<Page width={900} pageNumber={i} />)
      }
    }
    console.log('hereherehereherehereherehereherehereherehereherehereherehereherehere')

console.log(pages)

console.log(this.state.pages)
return <Document
              file={`${url}`}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              {pages}
            </Document>
  }
}
const contentful = require("contentful")
let key = "eWhI0H7MtQjMVqh1Z8BvS8XpZTgE5sEcyMyyu23W6SE"
const client = contentful.createClient({
  space: "an8q9497b29q",
  accessToken: key,
})
function processPosts(data) {

  function postExtractor(post) {
    let {
      title:name,
      summary,
      heroImage,
      body,
    } = post.fields
    return {
      name,
      summary,
      hero:heroImage.fields.file.url,
      description: documentToReactComponents(body,{
        renderNode: {
          'embedded-asset-block': (node) =>{

            console.log(node)
            if(node.data.target.fields.file.contentType=="application/pdf"){
              return  <PdfViewer {...{url:node.data.target.fields.file.url}}/>
            }
            return <img width = {300} class="img-fluid" src={`${node.data.target.fields.file.url}`}/>
          }
        }
      }),
    }
  }
  let posts = data.toPlainObject().items.map(postExtractor)
  console.log(posts)
  return posts
}
console.log(PdfViewer)
let list = [
  {
    name:"News Bulletin", 
    summary:'Stay updated on all current buffalo soldier news!',
   list :[
      {
        name:"The new Buffalo soldiers website is live!",
        description:"this is my first post"
      },
      {
        name:"Registration is open for this years annual union (2020)",
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
    name:"Chaplain's corner",
    description:<>3816 Caroline Street ~ Houston, TX
 

    Now located at the famed Buffalo Soldiers National Museum in Houston, TX. We are delighted to be located in such a prestigious Museum and associated with a great historical heritage. Long overdue, in December 2017 we celebrated the opening of our new home.
    With our new headquarters come the appointment of Our new Executive Director, Lifetime Association member and Chair of our Buffalo Soldier Corp Committee, Michael Theard. Meet Mike:
    
    
    Mr. Theard possesses more than 42-years in Professional Services and nearly 15 years’ experience supporting DHS/FEMA programs; initially as a project manager for end user services office buildouts, then as the FEMA/NCP contract PM responsible for monitoring, reviewing, reporting and budgeting preparation and execution functions for FEMA NCP, specifically within the Business Management and Continuity Communications Divisions’ PAMSS task orders; he possesses in-depth experience initiating, planning, implementing, and closing out several of the DHS Headquarters office location build out projects with emphasis on technology services throughout the National Capital Region. His efforts resulted in office, conference, and training space for the HQ DHS Offices of Human Capital, Legislative Affairs, Labor Relations, Procurement, Transformation, Infrastructure Management, Counter Intelligence, Security, Domestic Preparedness, and FEMA National Preparedness and Grants Programs.
     
    
    In addition to his Buffalo Soldier Corp responsibilities, Mike will oversee all National Headquarters activities, grants and fundraising projects. We are truly honored that Mike accepted this appointment from the National Executive Board. 
     </>
  },
  {
    name:"Annual Newsletter",
    description: <PdfViewer {...{url:pdf1}}/>

  },
]

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list:[...list]}
  }
componentDidMount(){
syncData.bind(this)('post',0)
syncData.bind(this)('chaplainsCornerPost',1)
}
  render() {
    return <ContentPage {...{name:"news",list:this.state.list}}/>;
  }
};

function syncData(type,index){
  let component = this
  client
  .getEntries({ content_type: type})
  .then(response => {
    console.log(response)
    let list = [...component.state.list]
    list[index].list =  processPosts(response)
    list[index].description = <ul>
      {list[index].list.map((e,i)=><li className = "t-postItem">
        <Link to={"/news?page="+index+"_" + i}>
          <div className='t-postItem__media'>
            <img width={250} src={e.hero}/>
<div>

          <h2 className = "t-postItem__header">{e.name}</h2>
          <div className = "t-postItem__body">{e.summary}<br/></div>
          <Button color='secondary' variant='contained'>Read More</Button> 
          </div>
        </div>
          
        </Link>
      <hr/>
      </li>)
      
      }
        </ul>
          console.log(list)
          component.setState({ list, loaded: true })
        })
  .catch(console.error)
}
