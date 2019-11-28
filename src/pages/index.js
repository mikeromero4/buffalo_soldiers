import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import 'typeface-roboto';
import 'typeface-roboto-slab';
import Button from '@material-ui/core/Button';
class IndexPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage:0    
    }
  }
  render() {
    console.log(this.props)
    return (<>
        <SEO title="Home" />
        
        <div className = "media--large">

       <div className = "media__image">
         <img className='bg1' src = "http://realhistoryww.com/world_history/ancient/Misc/Buffalo_soldiers/Indian_96.JPG"/>
       </div>
       <div className = "media__content">
       <h2>National Buffalo Soldiers</h2>
       <h4>
       The 9th & 10th (Horse) Calvary Association
       </h4>
       The National  Association is an official military unit representing one of the most famed,  Military Units in the history of the American Armed Forces.
       </div>
       </div>
</>
    );
  }
}
export default IndexPage
