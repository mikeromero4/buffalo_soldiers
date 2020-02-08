import React, {Component} from "react"
import Stepper from "../../organisms/stepper/index"
import {Button,Box,CircularProgress} from '@material-ui/core';
import "./style.scss"

import { useMediaQuery } from 'react-responsive'
class Comp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        progress: 0,
        activeStep:0,
        data: [],
      }
      this.setActiveStep=this.setActiveStep.bind(this)
      this.simulate= this.simulate.bind(this)

      this.handleBack=this.handleBack.bind(this)
      this.handleNext=this.handleNext.bind(this)
      this.checkProgress=this.checkProgress.bind(this)

      this.simulate=this.simulate.bind(this)

      this.controller = {
        setProgress: this.setProgress.bind(this),

        allData: this.allData.bind(this),
        setData: this.setData.bind(this),
        clearNextAction: this.clearNextAction.bind(this),
        setNextAction : this.setNextAction.bind(this),
        data: function(index) {
          if (index!==undefined){
            console.log(index)
                        console.log(this.state.data)

            console.log(this.state.data[index])
              console.log("here")
            return this.state.data[index]
          }
          return this.state.data
        }.bind(this),
        progress: function() {
          return this.state.progress
        }.bind(this),
        
      }
      this.steps=[]
      let component=this
      React.Children.forEach(
        this.props.children, 
        (child,index) => {
            this.steps.push({
             
              name: child.props.name || 'noname',
              icon:<div>asdf</div>,
          description: React.cloneElement(
            child, 
            { action:child.props.actionRequest!=undefined?((index,controller)=>{
              return function(){return component.simulate(...child.props.actionRequest(index,controller))}
            }):null,
              key:'m'+index,index,small:this.props.small,controller:this.controller,...this.props}
          )
        })
          })
          this.actions=[]
    }
    setActiveStep(fn){
      let x=fn(this.state.activeStep)
      this.setState({activeStep:x})
    }
    setProgress(progress) {
    

      if(progress!=this.state.progress){
      this.setState({ progress: progress })
    }
  }
  allData(){
    let data=this.state.data.reduce((p,c)=>({...p,...c}))
    return data
  }
    setData(data,index,fn) {
      //since two components call setstate factoring in current state, and state updates are not immediate, to avoid cancelling eachother,
      //create a recurseive que, 'actions' that will fire off the next setstate only after completing the first.
     for(let key in data){
       data[key].form=index
     }
      this.actions.push(()=>{
        console.log(data)
        console.log(this.state.data)
      let newData=[...this.state.data]
      newData[index]={...newData[index],...data}
      this.setState({ data: newData },function(){
        this.actions.shift()
        if(fn){fn()}
        if (this.actions.length > 0){
            this.actions[this.actions.length-1]()
        }
        this.checkProgress()
      })
    })
    if (this.actions.length==1){
      this.actions[0]()
    }
    }
    async checkProgress() {
      let data = []
      Object.keys(this.state.data[this.state.activeStep]).forEach(e =>{
        if(this.state.data[this.state.activeStep][e].form==this.state.activeStep){
          data.push({ id: e, ...this.state.data[this.state.activeStep][e] })
        }
      })
      console.log(data)
      let validForm = data.every(e => e.valid == true || e.required !== true)
      if (validForm == true) {
        this.controller.setProgress(this.state.activeStep + 1)
      } else {
        this.controller.setProgress(this.state.activeStep)
      }
    }
    componentDidUpdate(props,state){
      let d1=state.data
      let d2=this.state.data
      if(JSON.stringify(d1)!==JSON.stringify(d2)){
        this.props.dataHook(this.state.data)
      }
    }
    setNextAction(action){
      this.setState({nextAction:action})
    }
    clearNextAction(){
      this.setState({nextAction:undefined})
    }
    async handleNext() {
    this.setState({error:""})
    this.clearNextAction()

    
    if(this.state.waiting==true){return}
    if (this.state.nextAction){
      this.setState({waiting:true})
      let response = await (this.state.nextAction())
      console.log(response)
      if (response.error){
          this.setState({error:response.error,waiting:false})
          return
      }
      else{
        this.setData(response.data,response.index)
        
          this.setState({waiting:false})
        

      }  
      }
      this.setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    handleBack() {
      this.clearNextAction()
      this.setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    handleReset() {
      this.setActiveStep(0);
    };

    
async simulate(request,handler){
  let session=fetch(request.url,{
  method:'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: request.action,
    input:{...request.input}
  })
})
let data = (await (await session).json()).body


let {error,body,redirectTo} = (handler(data))
console.log(this.controller)
console.log('here')
if(redirectTo){
  this.setActiveStep(() =>redirectTo);
}
if (error){return{error}}
              return {
                data:{...body},
                index:request.index
              }
}
    render(){
          let buttonProps = {
            activeStep:this.state.activeStep,
            steps:this.steps
            ,progress:this.state.progress,
            handleBack:this.handleBack,
            handleNext:this.handleNext}
      return<div className =  {"processingContainer"}> 
      
     <div className = {"processingScreen" + (this.state.waiting?" active":"")}>processing...<br/><CircularProgress color="primary"  /></div>
      <Stepper  

      error = {this.state.error}
      setActiveStep={this.setActiveStep}
      activeStep={this.state.activeStep}
      progress={this.state.progress}
      ContentHolder={function({children}){
        return <div>{children}</div>}
      } 
      steps={this.steps}/>
      <Buttons {...buttonProps}/>
      </div>
    }
}
export default(props)=>{
  let small= useMediaQuery(
    {
    query: '(max-width: 680px)'
  })
  return <Comp {...props} small={small}/>
}
function Buttons({activeStep,steps,progress,handleBack,handleNext}){
  return               <Box mt={4}  px={4} pt={1} pb={0} width='100%' display = "inline-flex" flexDirection = "row" justifyContent = "space-between">
  {activeStep === steps.length ? (<Button fullWidth variant="contained"
        color="secondary">Go Home</Button>)
   : <>
      <Button fullWidth variant="contained"
        color="primary" disabled={activeStep === 0} onClick={handleBack} >
        Back
      </Button>
      <Box width={64}/>
      <Button 
      disabled={ (activeStep >= progress) && (activeStep !== steps.length - 1) } fullWidth
        variant="contained"
        color="secondary"
        onClick={handleNext}
        
      >
        {activeStep === steps.length - 1 ? 'Confirm & send' : 'Continue'}
      </Button>
    </>}

</Box>
}