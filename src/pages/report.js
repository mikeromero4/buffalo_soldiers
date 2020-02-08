
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
let bankAssets = [
  "BOA - Scholarship",
  "BOA - Life Memberships ",
  "BOA - Operating",
  "BOA - Savings",
]

let otherAssets = [
  "Grant Receivables"
]
let liabilities = [
  "liabilities"
]

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
let equity = [
  "Perm. Restricted Net Assets ",
  "Unrestricted Net Assets",
  "Net Income",
  "Total Equity",
]

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
            list.map((e)=><div className='item'>
            {e.name}<input type = "number" min = {0}
            onFocus = {(event) => event.target.select()}
            onChange={function(event){
                controller.setData(name,{name:e.name,value:event.target.value})
                }} value = {e.value}></input>
            </div>)
        }
<span className = "total">total {name}: ${total}.00</span>
        </>
    
}
function Expenses(props) {
    return<ControlledInput controller = {props.controller} name = "expenses" list = {expenses} />
}
function BankAssets(props) {
    return<ControlledInput controller = {props.controller} name = "bank accounts" list = {bankAssets} />
}
function OtherAssets(props) {
    return<ControlledInput controller = {props.controller} name = "other current assets" list = {otherAssets} />
}
function Liabilities(props) {
    return<ControlledInput controller = {props.controller} name = "liabilities" list = {liabilities} />
}
function Income(props) {
    return<ControlledInput controller = {props.controller} name = "income" list = {income} />
}
function Equity(props) {
    return<ControlledInput controller = {props.controller} name = "equity" list = {equity} />
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expenses:[],income:[],otherAssets:[],bankAssets:[]}
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
      let expenses1 = dd(((this.state?.expenses)||[]),expenses)

      let income1 = dd(((this.state?.income)||[]),income)
      let totalAssets = dd(((this.state["bank accounts"])||[]),bankAssets) + dd(((this.state["other current assets"])||[]),otherAssets)
      const {
      props,
    } = this;

    return < >
      <SEO title="Page two" />
      <Main margin>
      <Section name = "intro" classes={['-transparent']}>

      <Box width = {700} p={6}><Paper><Box p={2}>
      <h1>income report</h1>
      <h3 style = {{display:'inline-block'}}>chapter name:</h3> <input/>
     <br/> <h3 style = {{display:'inline-block'}}>January 1 - December 31, 20</h3> <input style={{ width:'100px'}}type = "number"/>
  <Income controller = {this.controller}/>
  <br/><br/>
  <Expenses controller = {this.controller}/>
  <hr/>
  <span className = "doubleLabel">Net operating income:   <span className = "double">${income1 - expenses1}.00</span></span>
<br/>
  <span className = "doubleLabel">Net income:   <span className = "double">${income1 - expenses1}.00</span></span>


<hr/>
<hr/>
<h2>Assets</h2>
<BankAssets controller = {this.controller}/>

<OtherAssets controller = {this.controller}/>
<span className = "doubleLabel">Total assets:   <span className = "double">${totalAssets}.00</span></span>

<hr/>
<Equity controller = {this.controller}/>
<span className = "doubleLabel">Total equity:   <span className = "double">${totalAssets + income1 - expenses1}.00</span></span>

       </Box> </Paper></Box>
     </Section> </Main>
    </>;
  }
};


// Net Operating Income 
// Net Income

// LIABILITIES AND EQUITY Liablitities
// "Total Liabilities"	



function dd(data,list){
  console.log(data)
  list=list.map((e)=>({name:e,value:data?.[e]?.value||0}))
  let expenses = list.reduce((p,c)=>p + Number(c?.value),0) || 0
return expenses

}