import React from "react"
import SEO from "../components/utilities/seo"
import PaymentForm from '../components/molecules/forms/paymentInformation'
import Controller from '../components/molecules/forms/controller'

import {
  Box,
  Button,
  Paper,
  TextField
} from "@material-ui/core"
import { Main } from "../components/templates/generic/common"
import Stepper from "../components/organisms/stepper/index"
import img from '../images/bg1.png'
import "./donate.scss"
let donations = [5, 10, 25, 50, 100, 250, 500]

let ConfirmSection=(props)=>{
let{donation,personalInfo}=props.controller.data()
let{first,last,email}=personalInfo
console.log(personalInfo)
  return (
    <div className='o-donations__content'>
      <Box p={2} textAlign="center">
      <h3 className="o-donations__header -lg">
          {" "}
          Confirm Donation
        </h3>
        <p className="o-donations__header -secondary">
          Donation amount: ${donation}.00
         <br/> name: {first.value+' '+ last.value}
          <br/>email:{email.value}
          </p>
          </Box>
          </div>)
}
let DonationSection = class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { donation } = this.props.controller.data()
    return (
      <div className='o-donations__content'>
           <h1 className="ut-gold heading--special1"> Donate Now</h1>
        <Box p={2} textAlign="center">
          <h3 className="o-donations__header">
            {" "}
            How much would you like to Donate?
          </h3>
          <p>
        Donate
          $50 or more to be added to perpetual Plaque which will hang proudly 
          in our Headquarters office in the National Buffalo Soldier Museum.

          </p>
        </Box>
        <Box display="flex" justifyContent="space-between">
          {donations.map(e => (
            <Button
              color="primary"
              variant={
                this.props.controller.data().donation != e
                  ? "outlined"
                  : "contained"
              }
              onClick={function() {
                this.forceUpdate()
                this.props.controller.setProgress(1)
                this.props.controller.setData({ donation: e })
              }.bind(this)}
            >
              ${e}.00
            </Button>
          ))}
        </Box>
        <br />

        <div
          className="o-donations__amount"
          style={{ background: "#000g", padding: "12px" }}
        >
          Donate ${" "}
          <TextField
            label="amount*"
            placeholder="amount*"
            color="primary"
            variant="filled"
            startAdornment={<div>$</div>}
            value={Math.max(0, Math.min(donation, 2000))}
            type="number"
            onChange={function(e) {
              this.forceUpdate()
              this.props.controller.setProgress(1)
              this.props.controller.setData({ donation: e.target.value })
            }.bind(this)}
          ></TextField>
        </div>
      </div>
    )
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      data: { donation: 0 },
    }
    this.controller = {
      setProgress: this.setProgress.bind(this),
      setData: this.setData.bind(this),
      data: function() {
        return this.state.data
      }.bind(this),
      progress: function() {
        return this.state.progress
      }.bind(this),
    }
    this.dataHook = this.dataHook.bind(this)

  }
  dataHook(data){
    this.setState({data:data})
  }
  setProgress(progress) {
    this.setState({ progress: progress })
  }
  setData(data) {
    this.setState({ data: { ...this.state.data, ...data } },()=>{console.log(this.state.data)})
  }
  render() {
    return (
      <>
        {" "}
        <SEO title="Page two" />
        <Main margin flush>
        <div className='l-topSection'>

<div className='l-topSection__seperation'>
       <p className='o-donations__note -t'>
Want to honor our loved ones and living Troops, or those who have
gone to Fiddlers Green? consider a Memorial donation to the 9th &
10th (Horse) Cavalry Association in their name. All Memorial Donations will help support our New National
          Headquarters that proudly honors our Buffalo Soldiers. 
</p>
</div>
</div>
          <div
            style={{
              backgroundSize: "cover",
              backgroundImage:
                "url("+img+")",
            }}
          >
            <Box margin="auto" width={800}>
            <Controller dataHook = {this.dataHook}>

               <DonationSection name = "donation" />
               <PaymentForm name = "info"/>
              <ConfirmSection name = "confirm"/>
              </Controller>
            </Box>
          </div>
          <div className="o-donations__note">

         
          <img className='o-donations__image' src='https://i0.wp.com/www.910hcav.org/wp-content/uploads/2017/05/A-Salute-To-Our-Heroes-630x452.png?resize=300%2C215&ssl=1'/>
            
            <p>
            By supporting the National Association, you have the opportunity to honor a special person or pay tribute to someone you love by making a memorial donation where you can help make a difference in the lives of deserving veterans, the Buffalo Soldiers. A gift in honor of a memorial donation is a unique way to acknowledge that extraordinary individual in your life. Your donation helps us to continue to educate, perpetuate and celebrate the history and heritage of GREAT American Heros.

  
            </p>
          </div>
        </Main>
      </>
    )
  }
}

function Content({ children }) {
  return (
    <div>
      <Box pb={4}>
      <Paper mb={2}>
        <Box p={4}><>
{children}</></Box>
      </Paper>
      </Box>
    </div>
  )
}
