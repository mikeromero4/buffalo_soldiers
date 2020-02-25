import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import "../style/lightbox.css"
import Gallery from '../components/organisms/gallery/gallery'
import { Main } from "../components/templates/generic/common"
import { Box, Paper,Grid } from "@material-ui/core"
import { useMediaQuery } from 'react-responsive'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Markdown from 'markdown-to-jsx';


const contentful = require("contentful")
let key = "eWhI0H7MtQjMVqh1Z8BvS8XpZTgE5sEcyMyyu23W6SE"
const client = contentful.createClient({
  space: "an8q9497b29q",
  accessToken: key,
})
const IndexPage = () => {
  let [image,setImage]=useState('https://i0.wp.com/www.910hcav.org/wp-content/uploads/2018/09/Denver-JR-BS-2.jpg?resize=600%2C399&ssl=1')
let [body,setBody]=useState('loading content...')

let [loaded,setLoaded]=useState(false)
if(loaded===false){

  client
  .getEntries({ content_type: 'miscPages'})
  .then(response => {
    let image=response.items[0].fields.heroImage.fields.file.url
    let body=documentToReactComponents(response.items[0].fields.body,{
      renderText: text => {
        let n=text.split('\n').reduce((children, textSegment, index) => {
          return [...children, index > 0 && <br key={index} />, textSegment];
        }, [])
        console.log(n)

        console.log('asdfasdfasdfasdfasdfasdfa sdf as df as df asdfasdfasdfasdf')
        return  n
      },
      renderNode: {
        
        'embedded-asset-block': (node) =>{
          return <img width = {300} class="img-fluid" src={`${node.data.target.fields.file.url}`}/>
        }
      }
    })
    console.log(image)
    setImage(image)
    setBody(body)
  })
  setLoaded(true)
}
  let small= useMediaQuery(
        {
        query: '(max-width: 680px)'
      })
      console.log(ReactDOMServer.renderToString(body)
      .split('&#x27;').join('"')
      .split('&lt;').join('<')
      .split('&gt;').join('>'))
    return  <Main margin flush>
    <div className="l-topSection">
    <h2 className = "heading--2 ut-gold heading--special1"> Junior Buffalo soldiers</h2>
          </div>
<Box p = {small?1:4}><Paper><Box style={{overflow:'auto',}} p = {small?1:4}>
<img width = {400} style = {{float:"right",marginLeft:"12px",maxWidth:'100%'}} 
src = {image}/>

         <Markdown>{ReactDOMServer.renderToString(body)
         .split('&#x27;').join('"')
         .split('&lt;').join('<')
         .split('&gt;').join('>')}</Markdown>
         </Box> </Paper> </Box>
          </Main>
}


export default IndexPage
