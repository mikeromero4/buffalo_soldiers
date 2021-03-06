import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import {Box,Button,Paper} from "@material-ui/core"
import { Main, Section } from "../components/templates/generic/common"
import './membership.scss'
import {Carousel} from  "react-responsive-carousel"
import Controller from "../components/molecules/forms/controller"
import PaymentForm from "../components/molecules/forms/paymentForm"
import { useMediaQuery } from 'react-responsive'
import Confirm from "../components/molecules/forms/confirmMembership"
import img1 from '../images/bs1.png'

import Membership from "../components/molecules/forms/memberships"

// If you are renewing our membership click here.  if you are a new member complete the form below and follow the instruction to submit at the bottom of the form.

//including a Life Members only event at are annual reunions. The Life Member Belt Buckle is available for purchase by Life Members ONLY!  Click here to purchase a buckle. Your life membership status will be verified prior to shipment.  There are a limited supply of buckles remaining.  For more information on the Life Member Belt Buckle please contact Trooper Samuel Pitts here; Belt Buckle

// Any person who served honorably in the War with Spain (Cuba) or the
//Punitive Expedition (Mexico) is automatically Honorary Members

// Any person who has ever served with any unit of the Ninth and Tenth Cavalry Regimentsor Squadrons. 

//Life Members receive a life membership card, a framed life membership certificate presented at our annual reunions.

//members shall have a vote on the floor after one year of membership.

// Honorary members must submit proof of elegibility upon enrollment
let memberships=[
{name:'Regular Membership',
description:`The Regular Membership fee into the Association is $50.00 per person. To remain in the Association, an annual renewal fee of $50.00 is required. Anual members aquire an official destinguished status at the second year of membership.`,
amount:50 
},
 {name:'Lifetime Membership',
 description:`Life Membership allows you to pay a one time membership fee into the Association. Upon approval, lifetime members immediately become distinguished members and recieve a life membership card and framed certificate. Lifetime membersship costs $300.00 if you are 62 and older or $400.00 if you are age 61 and younger `,
amount:300
},
     {
name:'Honorary Membership',
description:`Any person who has performed distinguished service for the United States or for this Association may be accepted as an Honorary Member. Honorary members shall not pay annual dues and automatically are granted with distinguished member status.`,
amount:0
}
// {name:'Allied Membership',
// description:` Any person who has served with any unit of the Twenty Seventh or Twenty Eighth Cavalry
// Regiments`
// },
// {name:'Association Members',
// description:` Any person who has rendered outstanding service to the Association or to the country
// through service in either the Armed Forces or his/her community. Such members shall have a vote on the floor after
// one (1) year of membership.`
// },
// {name:'Family Membership',
// description:` Any person who is a descendent of a Regular, Allied or Associate
// Member`
// },
]

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.dataHook = this.dataHook.bind(this)

    this.paymentAction=(index, controller)=> {
let allData = controller.allData()
console.log(allData)
let{membership:{value:membership},email:{value:email},card:{value:{id:card}}} = (allData)

return [{
url:"https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1",
input:{amount:5000,card,email,description:'Membership payment: '+membership.charAt(0).toUpperCase() + membership.slice(1)},// capitalize event name
action:'charge',
index,
},
function(allData) {
  console.log(allData)
  let error
  if(allData.type=="StripeCardError"){error=allData.raw.message;return { error,redirectTo:1 }}
  let body = {order:{...allData}
  }
  return { body, error }
},
]
}
  }
  dataHook(data) {
    this.setState({ data: data })
  }
  render() {
    const {
      props,
    } = this;
    let{small}=this.props

    return < >
      <SEO title="Page two" />
      <Main margin flush>
      <div className='l-topSection'>
        <div className='l-topSection__content'>
      <Carousel showIndicators ={false} showThumbs={false}  autoPlay infiniteLoop height='100px'>
                  
                      <div>
                          <img height={small?400:500} className='membershipImage' src={img1} />
                      </div>
                      <div>
                          <img height={small?400:500} className='membershipImage' src="https://media-cdn.tripadvisor.com/media/photo-s/0b/91/f3/8c/buffalo-soldier-monument.jpg" />
                      </div>   
                       <div>
                          <img style={{marginBottom:'-50px'}} height={small?400:550} className='membershipImage' src="http://realhistoryww.com/world_history/ancient/Misc/Buffalo_soldiers/Indian_95.JPG" />
                      </div>
                  </Carousel>
  <div className="floatCenter">
    <div className='o-carousel__banner'>
      <h1 className='ut-gold hearder--2 o-carousel__bannerText -h'> Become a Member</h1>
      <span className='o-carousel__bannerText -p'>Membership  in the National  Association is open to all Veterans of any war,  living Original  Buffalo Soldiers, Descendants of a Buffalo Soldier, or any adult who wants to participate in the perpetuation,  education, and celebration of the Buffalo Soldiers.</span>
    </div></div>
  </div>
  <div className='l-topSection__seperation'>
    {/* {memberships.map(e=><Button>{e.name}</Button>)} */}
    
    </div>
    </div>
      <Section name = "intro" classes={['-transparent']}>


      <Box p = {small?1:4}><Paper><Box p = {small?1:4}>
  <Controller message = "We have received your membership payment. Welcome! We've e-mailed you a receipt." dataHook={this.dataHook}>
  <Membership name ='membership'/>

  <PaymentForm name ='info'/>
  <Confirm  actionRequest={this.paymentAction} name ='confirm'/>

  </Controller>
 </Box> </Paper> </Box>
     </Section> </Main>
    </>;
  }
};
export default(props)=>{
  let small= useMediaQuery(
    {
    query: '(max-width: 680px)'
  })
  return <Comp {...props} small={small}/>
}