import React from "react"
import { Box, Button, TextField } from "@material-ui/core"

let memberships=[
    {name:'Regular Membership',
    description:`The Regular Membership fee into the Association is $50.00 per person. To remain in the Association, an annual renewal fee of $50.00 is required. Anual members aquire an official destinguished status at the second year of membership.`
     },
     {name:'Lifetime Membership',
     description:`Life Membership allows you to pay a one time membership fee into the Association. Upon approval, lifetime members immediately become distinguished members and recieve a life membership card and framed certificate`
    },
         {
    name:'Honorary Membership',
    description:`Any person who has performed distinguished service for the United States or for this Association may be accepted as an Honorary Member. Honorary members shall not pay annual dues and automatically are granted with distinguished member status.`
         }
        ]
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler= this.clickHandler.bind(this)
  }
  async clickHandler(e) {
    let data = this.props.controller.data()[this.props.index]
   let form = this.props.index
  
   let newData = {
     ...data,
     donation: { valid:true,value:e, form,required:true },
   }
    this.props.controller.setData(newData,this.props.index)
   this.forceUpdate()
 }
  render() {
    return (
      <div className="o-donations__content">
        <Box  textAlign="center">
          <h3 className="o-donations__header">
            Choose a membership
          </h3>
         
        </Box>
        <div className='membershipOptions'>

        {memberships.map((e)=><div className='membershipOptions__option'>
   <h3>{e.name}</h3>
   <span>{e.description}</span>
  <br/> <Button color='primary'>{e.name} Application</Button>
 </div>)}
      </div>
      </div>
    )
  }
}