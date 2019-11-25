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
       
hello
</>
    );
  }
}
export default IndexPage
