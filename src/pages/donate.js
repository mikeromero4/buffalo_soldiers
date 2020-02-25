import React from "react"
import SEO from "../components/utilities/seo"
import PaymentForm from "../components/molecules/forms/paymentForm"
import Confirm from "../components/molecules/forms/confirmDonation"
import Donate from "../components/molecules/forms/donate"
import Controller from "../components/molecules/forms/controller"
import { Box, Paper,Grid } from "@material-ui/core"
import { Main } from "../components/templates/generic/common"
import img from "../images/bg1.png"
import "./donate.scss"
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useMediaQuery } from 'react-responsive'



let donationMethods = [    
  "guns",
"gift cards & gift certificates",
"company products",
"vacation stays, as silent auction items",
"event tickets (sports, concerts, etc)",
"stock and bonds",
"sports memorabilia",
"antique furniture",
"coin / stamp collections",
"cars & other type of automobiles",
"real estate / single-family homes",
"real estate / income property",
"real estate / commercial property",
"horses / livestock",
"insurance policy",
"boats",
"farm equipment",
"tools / and other equipment",
"musical instruments",
"art / collections"
]
let message = <div>
  All donations are tax-deductible and help to ensure the ongoing financial stability of the 9th and 10th (horse) cavalry Association.
<br/>To donate an item, contact national treasure:
<br/>Larry Thornton P.H.D
<br/>526-482-3478
<br/>tgpLarryt@aol.com
</div>

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dataHook = this.dataHook.bind(this)
        this.paymentAction=(index, controller)=> {
let allData = controller.allData()
console.log(allData)
let{donation:{value:amount},email:{value:email},card:{value:{id:card}}} = (allData)

return [{
url:"https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1",
input:{amount:amount*100,card,email,description:'Donation of $' + amount + ".00"},// capitalize event name
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
    let{small}=this.props
    return (
      <>
        {" "}
        <SEO title="Page two" />
        <Main margin flush>
          <div className="l-topSection">
            <div className="l-topSection__seperation">
              <p className="o-donations__note -t">
                Want to honor our loved ones and living troops, or those who
                have gone to Fiddler's Green? Consider a memorial donation to the
                9th & 10th (Horse) Cavalry Association in their name. All
                memorial donations will help support our new national
                headquarters that proudly honors our Buffalo Soldiers.
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundSize: "contain",
              backgroundImage: "url(" + img + ")",
            }}
          >
            <Box margin="auto" p={small?1:4} maxWidth={800}>
              <Paper>
                <Box p={small?1:2}>
                  <Controller message = "Thank you for supporting the National Association your donation helps us to continue to educate, perpetuate and celebrate the history and heritage of GREAT American Heroes! We have e-mailed you a receipt." 
dataHook={this.dataHook}>
                    <Donate name="donation" />
                    <PaymentForm name="info" />
                    <Confirm  actionRequest={this.paymentAction} name="confirm" />
                  </Controller>

                </Box>
              </Paper>
            </Box>
            <Box p = {small?1:8}> <Paper>
              <Box p = {small?1:2}>
              

            <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon color='primary'/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >You can help support the Buffalo Soldiers Association without paying a dime! Click here to see 20 Other ways to donate and support the National Buffalo Soldiers Association:</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box px={4}>

       <hr/>
          <Grid container spacing={3}>
          {donationMethods.map((e,i)=><Grid item xs={small?12:6}>{small?i+1:(i+((i%2)==1?19:0))/2+1}. {e}</Grid>)}
          </Grid>
          <hr/><br/>
          <span style = {{textAlign:"Center",fontWeight:'bold'}}>
          {message}
          </span>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>


         
            </Box>
            </Paper>
            </Box>

          </div>
          <div className="o-donations__note">
            <img
              className="o-donations__image"
              src="https://i0.wp.com/www.910hcav.org/wp-content/uploads/2017/05/A-Salute-To-Our-Heroes-630x452.png?resize=300%2C215&ssl=1"
            />

            <p>
              By supporting the National Association, you have the opportunity
              to honor a special person or pay tribute to someone you love by
              making a memorial donation where you can help make a difference in
              the lives of deserving veterans, the Buffalo Soldiers. A gift in
              honor of a memorial donation is a unique way to acknowledge that
              extraordinary individual in your life. Your donation helps us to
              continue to educate, perpetuate and celebrate the history and
              heritage of GREAT American Heroes.
            </p>
          </div>
        </Main>
      </>
    )
  }
}
export default(props)=>{
  let small= useMediaQuery(
    {
    query: '(max-width: 680px)'
  })
  return <Comp {...props} small={small}/>
}