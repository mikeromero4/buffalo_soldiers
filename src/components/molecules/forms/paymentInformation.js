import React from "react"
import {
  Grid,
  Box,
  Select,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
} from "@material-ui/core"
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider,
} from "react-stripe-elements"

let titles = [
    "",
    "Mr.",
    "Mrs.",
    "Trooper",
    "General",
    "Col",
    "Lt. Col.",
    "Major",
    "Sgt. Major",
    "Sgt.",
  ]
class InfoSectionPresentational extends React.Component {
    constructor(props) {
      super(props)
      let data = {}
      this.items = [
        ...(this.props.append==false?this.props.additionalFields : []),
    {
      required:true,
      id: "first",
      name: "first name",
      sizes: { xs: 5, sm: 5 },
    },
  
    {
      required:true,
      id: "last",
      name: "last name",
      sizes: { xs: 5, sm: 5 },
    },
    {
      id: "prefix",
      name: "prefix",
      sizes: { xs: 2, sm: 2 },
      options: titles,
      helper: "(optional)",
    },
    {
      required:true,
      id: "email",
      name: "e-mail",
      sizes: { xs: 6, sm: 6, lg: 6 },
    },
    {
      id: "Chapter",
      name: "Chapter name",
      helper: "optional",
      sizes: { xs: 6, sm: 6, lg: 6 },
    },
    ...(this.props.append==true?this.props.additionalFields : []),
  ]
      if(props.controller.data().personalInfo){
        data=props.controller.data().personalInfo
      }
      else{
      this.items.forEach((e)=>{data[e.id] = {name:e.name,required:e.required}})
      }
      this.state = {data,card:false}
      this.checkProgress()
      this.submit = this.submit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.checkProgress = this.checkProgress.bind(this)
  
      // this.handleBlur = this.handleBlur.bind(this)
  
    }
    async submit(ev) {
      console.log(ev)
      let { token } = await this.props.stripe.createToken({ name: "Name" })
      console.log(token)
    }
    // handleBlur(event) {
    //   console.log(event.target.value)
    //   let{id,value} = event.target
    //   let data=this.state.data
    //   this.setState({data:{
    //     ...data,
    //     [id]:{...this.state.data[id],valid:this.validate(event.target)}
    //   }})
    // }
  
    handleChange(event) {
      let{id,value} = event.target
      let data=this.state.data
      let valid=this.validate(event.target)
      let newData={
        ...data,
        [id]:{...this.state.data[id],valid:valid,value}
      }
      this.setState({data:newData},this.checkProgress)
      
     this.props.controller.setData({ personalInfo: newData })
    }
    async checkProgress(){
  console.log(this.state)
  let data=[]
  Object.keys(this.state.data).forEach((e)=>data.push({id:e,...this.state.data[e]}))
  console.log(data)
  let validForm = data.every((e)=>e.valid==true || e.required!==true)
  if (validForm==true && this.state.card==true){
    let { token } = await this.props.stripe.createToken({ name: "Name" })
    this.props.controller.setData({ card: token })
    this.props.controller.setProgress(2)}
  else {this.props.controller.setProgress(1)}
  
    }
    validate(input){
      let{id,value} = input
      let valid=id=='email'
      ?value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)!==null:
      (value!==undefined && value!="")
      return valid
    }
    componentDidMount(){
      console.log("payment form mounted")
  }
    render() {
      console.log(this.state.data)
  
  let{title}=this.props
      let component=this
      return (
        <div className='o-donations__content'>
          <Box textAlign="center">
            <h3 className="o-donations__header">
              {title || 'Enter your payment information:'}
            </h3>
          </Box>
          <br />
          <Box p = {2} bgcolor='white'>
          <Grid bgcolor='black' container spacing={3}>
            {this.items.map(e => {
              let error=e.required && component.state.data[e.id]!=undefined && component.state.data[e.id].valid==false
              return(
              <Grid item {...e.sizes}>
                <FormControl fullWidth color="primary" variant="standard ">
                  <InputLabel htmlFor={e.name + "_input"}>{e.name}</InputLabel>
                  {e.options ? (
                    <Select
                    onChange={this.handleChange}
                    inputProps={{name:'asdf'}}
                    id={e.id}
                    native
                      fullWidth
                      //value={e.options[0]}
                      variant="standard"
                      aria-describedby={e.name + "helper"}
                      name={e.name}
                    >
                      {e.options.map(e => (
                        <option value={e}>{e}</option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                    value={this.props.controller.data().personalInfo?this.props.controller.data().personalInfo[e.id]?.value:""}
                      error={error}
                      onChange={this.handleChange}
                    //  onBlur={this.handleBlur}
                      fullWidth
                      variant="standard"
                      select={e.options !== undefined}
                      fullWidth
                      id={e.id}
                      aria-describedby={e.name + "helper"}
                      name={e.name}
                    />
                  )}
                  {e.helper || error ? (
                    <FormHelperText error={error} id={e.name + "helper"}>
                      {error?e.name=='e-mail'?'Please enter a valid e-mail address':'Please enter your '+((e.label!=='' && e.label!=undefined)?e.label:e.name):e.helper}.
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
            )})}
          </Grid></Box>
          <span className="o-donations__cardInput">Credit Card details:</span>
          <CardElement
            onChange={function(event) {
              //this.props.controller.setData({ Cardinfo: event.complete })
              this.setState({card:event.complete},this.checkProgress)
            }.bind(this)}
          />
          <button onClick={this.submit}>Purchase</button>
        </div>
      )
  
      // <Grid container spacing={3}>
      // {items.map((e)=><Grid item {...e.sizes}>
      // <div>
      //   <span>{e.name}</span>
      //  {e.options?
      //     <select id={e.name+'_input'} name={e.name} >
      //     {e.options.map((e)=><option value = {e}>{e}</option>)}
      //       </select>
      //       : <Input id={e.name+'_input'} name={e.name} />}
  
      // </div>
      //   </Grid>)}
    }
  }
  let InfoSection = injectStripe(InfoSectionPresentational)
  
  export default ({controller,title,additionalFields,append})=>{
  return <StripeProvider apiKey="pk_test_InINzDHBEOsFgTTZXdZvB0og008pNICPQq">
                        <Elements>
                          <InfoSection append={append} title={title} additionalFields={additionalFields} controller={controller} />
                        </Elements>
                      </StripeProvider>
  }