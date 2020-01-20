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

class InfoSection extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    console.log('hellooooooo')
    let data = {}
    this.items = this.props.fields || []
    if (this.props.controller.data()[this.props.index]) {
        data= this.props.controller.data()[this.props.index]
      } 
      this.items.forEach(e => {
        data[e.id] = {...data[e.id], name: e.name, required: e.required}
      })
      this.handleChange = this.handleChange.bind(this)

    this.props.controller.setData(data,this.props.index,()=>{
        this.forceUpdate()
    })
  }

componentDidMount(){
    let data = {}
    if (this.props.controller.data()[this.props.index]) {
        data = this.props.controller.data()[this.props.index]
      } 
      this.items.forEach(e => {
        data[e.id] = {...data[e.id], name: e.name, required: e.required}
      })
    this.props.controller.setData(data,this.props.index,()=>{
        this.forceUpdate()
    })
}
  handleChange(event) {
    let { id, value } = event.target
    let data = this.props.controller.data()[this.props.index]
    let valid = this.validate(event.target)
    console.log(data[id])
    let newData = {
      ...data,
      [id]: { ...data[id], valid, value },
    }
     this.props.controller.setData(newData,this.props.index)
    this.forceUpdate()
  }  
  validate(input) {
    let { id, value } = input
    let valid =
      id == "email"
        ? value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null
        : value !== undefined && value != ""
    return valid
  }

  render() {
    let component = this
    return (
      <Box p={2} bgcolor="white">
        <Grid bgcolor="black" container spacing={3}>
          {this.items.filter(e=>e.name!==undefined).map(e => {
            let error =
              e.required && component.props.controller.data()[component.props.index] &&
              component.props.controller.data()[component.props.index][e.id] != undefined &&
              component.props.controller.data()[component.props.index][e.id].valid == false
            return (
              <Grid item {...e.sizes}>
                <FormControl fullWidth color="primary" variant="standard ">
                  <InputLabel htmlFor={e.name + "_input"}>{e.name}</InputLabel>
                  {e.options ? (
                    <Select
                      onChange={this.handleChange}
                      inputProps={{ name: "asdf" }}
                      id={e.id}
                      native
                      fullWidth
                      value={this.props.controller.data()[this.props.index]
                        ? component.props.controller.data()[component.props.index][e.id]
                        ? this.props.controller.data()[this.props.index][e.id]
                            .value
                        : "":''}
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
                      value={
                        (this.props.controller.data()?.[this.props.index]?.[e.id]?.value)||'' //prevent input from becoming uncontrolled (undefined)
                      }
                      error={error}
                      onChange={this.handleChange}
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
                      {error
                        ? e.name == "e-mail"
                          ? "Please enter a valid e-mail address"
                          : "Please enter your " +
                            (e.label !== "" && e.label != undefined
                              ? e.label
                              : e.name)
                        : e.helper}
                      .
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    )
  }
}

export default ({ controller, fields ,index}) => {
  return <InfoSection index={index} fields={fields} controller={controller} />
}
