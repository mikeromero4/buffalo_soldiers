import React, {Component} from "react"
import Stepper from "../../organisms/stepper/index"
import {Button,Box} from '@material-ui/core';


export default class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        progress: 0,
        activeStep:0,
        data: {},
      }
      this.setActiveStep=this.setActiveStep.bind(this)

      this.handleBack=this.handleBack.bind(this)
      this.handleNext=this.handleNext.bind(this)

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
      this.steps=[]
      React.Children.forEach(
        this.props.children, 
        (child,index) => {
            this.steps.push({
              name: child.props.name || 'noname',
              icon:<div>asdf</div>,
          description: React.cloneElement(
            child, 
            {key:'m'+index,controller:this.controller,...this.props}
          )
        })
          })
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
    setData(data) {
      this.setState({ data: { ...this.state.data, ...data } },()=>{console.log(this.state.data)})
    }
    componentDidUpdate(props,state){
      let d1=state.data
      let d2=this.state.data
      if(JSON.stringify(d1)!==JSON.stringify(d2)){
        this.props.dataHook(this.state.data)
      }
    }
    handleNext() {
      console.log("next to")
      this.setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    handleBack() {
      this.setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    handleReset() {
      this.setActiveStep(0);
    };
    render(){
     console.log(this.state.progress)
     console.log(this.state.activeStep)
          let buttonProps = {
            activeStep:this.state.activeStep,
            steps:this.steps
            ,progress:this.state.progress,
            handleBack:this.handleBack,
            handleNext:this.handleNext}
      return<> <Stepper  
      setActiveStep={this.setActiveStep}
      activeStep={this.state.activeStep}
      progress={this.state.progress}
      ContentHolder={function({children}){
        return <div>{children}</div>}
      } 
      steps={this.steps}/>
      <Buttons {...buttonProps}/>
      </>
    }
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
        {activeStep === steps.length - 1 ? 'Confirm & send donation' : 'Continue'}
      </Button>
    </>}

</Box>
}