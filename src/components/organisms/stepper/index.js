import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import InfoIcon from '@material-ui/icons/Info';
import SendIcon from '@material-ui/icons/Send';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 40,
  },
  active: {
    '& $line': {
      background:'#caa110'
    },
  },
  completed: {
    '& $line': {
      background:'#caa110'
    },
  },
  line: {
    boxShadow: '2px 1px 0px #0000007d',
    height: 5,
    border: 0,
    backgroundColor: '#0a2f55',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    boxShadow: '2px 1px 0px #0000007d',
    backgroundColor: '#0a2f55',
    zIndex: 1,
    color: '#fffc',
    width: 85,
    height: 85,
    display: 'flex',
    flexDirection:'column',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    boxSizing: "initial",
    color: "#ffffff",
    border: "3px ridge #ffeeac",
    borderStyle: "ridge",
    boxShadow: "2px 2px 3px 0px rgba(0,0,0,.25)",
    backgroundImage: "linear-gradient(162deg, rgb(240, 211, 111) 0%, rgb(231, 198, 79) 40%, #d8a800 90%)",
    backgroundSize: "cover",
},
  completed: {
    background:'#caa110'
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LoyaltyIcon />,
    2: <InfoIcon />,
    3: <SendIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
    {completed ? <Check className={classes.completed} /> 
    : <>{icons[String(props.icon)]}</>}
    <span style={{display:'block'}}>{props.text}</span>
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};



export default class CustomizedSteppers extends React.Component {
  constructor(props) {
    super(props);
    
    this.steps =  this.props.steps.map(e => (
      <Step key={e.name}>
        <StepLabel StepIconComponent={(props)=><><ColorlibStepIcon text={e.name} {...props}/></>}></StepLabel>
      </Step>
    ))
  }

  componentDidMount(){
    console.log("stepper mounted")
}
shouldComponentUpdate(nextProps, nextState) {
  return this.props.activeStep !== nextProps.activeStep  || nextProps.error  !=  this.props.error;
}
  render() {
    let {setActiveStep,activeStep}=this.props
    const {steps,ContentHolder,progress,error} = this.props;


    return (
      <div >

        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
         {this.steps}
        </Stepper>
        <ContentHolder><>
       {error?<span style = {{color:"red",fontWeight:"bold",background:"white",padding:"6px",margin:"6px",display:"block"}}> {error}</span>:""}
        {activeStep === steps.length ? (
            <>
              <Typography >
{this.props.completedMessage}
              </Typography>
            </>
          ) : (
              <>{steps[activeStep].description}</>)}


                  </>
              </ContentHolder>
            
      </div>
    );
  }
}
