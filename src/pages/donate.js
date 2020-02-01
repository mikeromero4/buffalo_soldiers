import React from "react"
import SEO from "../components/utilities/seo"
import PaymentForm from "../components/molecules/forms/paymentForm"
import Confirm from "../components/molecules/forms/confirm2"
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


let donationMethods = [
  "cash",
  "gift cards & gift certificates",
  "in-kind product@donations",
  "vacation stays, as silent auction items",
  "event tickets (sports, concerts, etc) as silent auction items",
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
  "buds",
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

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dataHook = this.dataHook.bind(this)
  }
  dataHook(data) {
    this.setState({ data: data })
  }

  render() {
    return (
      <>
        {" "}
        <SEO title="Page two" />
        <Main margin flush>
          <div className="l-topSection">
            <div className="l-topSection__seperation">
              <p className="o-donations__note -t">
                Want to honor our loved ones and living Troops, or those who
                have gone to Fiddlers Green? consider a Memorial donation to the
                9th & 10th (Horse) Cavalry Association in their name. All
                Memorial Donations will help support our New National
                Headquarters that proudly honors our Buffalo Soldiers.
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundSize: "contain",
              backgroundImage: "url(" + img + ")",
            }}
          >
            <Box margin="auto" p={4} width={800}>
              <Paper>
                <Box p={2}>
                  <Controller dataHook={this.dataHook}>
                    <Donate name="donation" />
                    <PaymentForm name="info" />
                    <Confirm name="confirm" />
                  </Controller>

                </Box>
              </Paper>
            </Box>
            <Box p = {8}> <Paper>
              <Box p = {2}>
              

            <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon color='primary'/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >You can help support the Buffalo soldiers Association without paying a dime! Click here to see 20 Other ways to donate and supports the National Buffalo Soldiers Association:</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box px={4}>

       <hr/>
          <Grid container spacing={3}>
          {donationMethods.map((e,i)=><Grid item xs={6}>{i+1}. {e}</Grid>)}
          </Grid>
          <hr/><br/>
          <span style = {{textAlign:"Center"}}>
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
              heritage of GREAT American Heros.
            </p>
          </div>
        </Main>
      </>
    )
  }
}
