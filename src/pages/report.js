
import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import {Box,Button,Paper} from "@material-ui/core"
import { Main, Section } from "../components/templates/generic/common"

import "../style/report.scss"
// let url = "https://maps.googleapis.com/maps/api/geocode/json?"
// let key = "AIzaSyBi8HYhLfAHJ1SebXf7Bz2Q05h0L8ho-Vg"
// let cdata=[]

// chapters.forEach(async(e)=>{
//     let street = e.address.replace(" ","+")
//     let city = e.city.replace(" ","+")
//     let address=`${street},+${city},+${e.state}`
//     let url2=`${url}address=${address}&key=${key}`
//     let d=fetch(url2)
//     let p=await d
//     let v=await((await p).json())
//     if(v.results[0]==undefined){console.log({e,v})}
//     else{

//         let{geometry,place_id,types,formatted_address}=(v.results[0])
//         cdata.push({...e,geocoding:{geometry,place_id,types,formatted_address}})
//         console.log(cdata)
//     }
// })


let income = [
"Building Fund",
"Chaplain Donation ",
"Donation Income",
"Forestry Service",
"Income - Reunions ",
"Interest Income",
"Lifetime Belt ",
"Buckle Income",
"Membership Dues ",
"Miscellaneous Income ",
"Name Badge Income",]


let expenses = [
"Accounting Fees",
"Administrative Expense ",
"Auto Expense",
"Award - Expense",
"Bank Service Charge ",
"Banquet Expense",
"Benevolence",
"Chapter Expense",
"Filing Fee",
"Life Membership Buckle ",
"Meals & Entertainment ",
"Office Expense",
"Parade Expense",
"Postage Mailing Service ",
"Professional Fees",
"Rent - Self Storage ",
"Scholarship Expense ",
"Soldiers Bust Expense ",
"Travel and Meetings",
]
function ControlledInput({list,name,controller}) {
    let data = controller.getData(name)
    list=list.map((e)=>({name:e,value:data?.[e]?.value||0}))
    let total = list.reduce((p,c)=>p + Number(c?.value),0)
    return<>
    <h3>{name}</h3>
        {
            list.map((e)=><div>
            {e.name}<input type = "number" min = {0}
            onFocus = {(event) => event.target.select()}
            onChange={function(event){
                controller.setData(name,{name:e.name,value:event.target.value})
                }} value = {e.value}></input>
            </div>)
        }
<span>total {name}: ${total}.00</span>
        </>
    
}
function Expenses(props) {
    return<ControlledInput controller = {props.controller} name = "expenses" list = {expenses} />
}
function Income(props) {
    return<ControlledInput controller = {props.controller} name = "income" list = {income} />
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.controller = {
        setData:(name,value)=>{
            console.log(name)
            this.setState({[name]:{...this.state[name],[value.name]:value}})
        },
        getData:((name)=>this.state[name])
    }
  }

  render() {
      console.log(this.state)
    const {
      props,
    } = this;

    return < >
      <SEO title="Page two" />
      <Main margin>
      <Section name = "intro" classes={['-transparent']}>

      <Box  p={6}><Paper><Box p={2}>
      <h1>income report</h1>
  <Income controller = {this.controller}/>
  <br/><br/>
  <Expenses controller = {this.controller}/>
     
       </Box> </Paper></Box>
     </Section> </Main>
    </>;
  }
};


// Net Operating Income 
// Net Income

// SSETS
// Bank Account
// "BOA - Scholarship",
// "BOA - Life Memberships ",
// "BOA - Operating",
// "BOA - Savings",
// Total Bank Accounts
// Other Current Assets
// "Grant Receivables"
// Total Other Current Assets
// TOTAL ASSETS

// LIABILITIES AND EQUITY Liablitities
// "Total Liabilities"	

// Equity
// Perm. Restricted Net Assets 
// Unrestricted Net Assets
// Net Income
// Total Equity
