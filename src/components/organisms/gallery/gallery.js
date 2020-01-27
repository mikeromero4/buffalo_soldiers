import { graphql,StaticQuery } from 'gatsby'
import React from 'react'
import Button from '@material-ui/core/Button';

// import SEO from '../components/seo'
import Gallery from '@browniebroke/gatsby-image-gallery'

const IndexPage = () => {

  return (<StaticQuery
    query={graphql`
    query ImagesForGallery {
      images: allFile(
        filter: { relativeDirectory: { eq: "gallery" } }
        sort: { fields: name }
      ) {
        edges {
          node {
            id
            thumb: childImageSharp {
              fluid(maxWidth: 270, maxHeight: 270) {
                ...GatsbyImageSharpFluid
              }
            }
            full: childImageSharp {
              fluid(
                maxWidth: 1024
                quality: 85
                srcSetBreakpoints: [576, 768, 992, 1200]
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `}
    render={(data)=>{
        const fullSize = data.images.edges.map(edge => edge.node.full.fluid.src)
        const thumbs = data.images.edges.map(edge => edge.node.thumb.fluid)
        console.log(data)
    return<>
      <h1>Image gallery</h1>
      <Gallery lightboxProps={{
          toolbarButtons:[<Button>View Gallery</Button>]
      }} images={fullSize} thumbs={thumbs.slice(0,2)} />
      </>
    }
    }
/>  )
}


export default IndexPage