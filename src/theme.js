import { createMuiTheme } from "@material-ui/core/styles"

export default {
  ...createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#0a2f55", // royal blue
      },
      secondary: {
        main: "#caa110", //gold
      },
      background: {
         paper: "#fff",
         default: "#fff",
      },
    },
    overrides: {
      MuiTablePagination:{
        root:{
          color:'#000'
        }
      },
      MuiTableSortLabel:{
        icon:{
path:{
          color:'#555 !important',
           }   }
      },
      MuiTableSortLabel:{
        active:{

          color:'#caa110 !important',
        }
      },
      MuiTableCell:{
        color:'#ddd',
// head:{
//   color:'#000'
// },
        body:{
          color:'#000'
        }
      },
      MuiFormHelperText:{
        root:{
          color:'#0a2f55'
        }
      },
      MuiInputBase:{
        root:{
          color:'#0a2f55'
        }
      },
      MuiFormLabel:{
        root:{
          color:'#0a2f55'
        }
      },
      MuiInput: {
        underline: {
          "&:before": {
            borderBottom: `1px solid black`
          }
        }
      },
      PrivateTabIndicator: {
        colorPrimary: {
          display: "none",
        },
        colorSecondary: {
            bottom:'unset',
            top:'0',
            height:'5px',
          backgroundColor: "#caa110",
        },
      },
      MuiPaper:{
        root:{
          backgroundColor:"#ffffffb3",
          color:"#262265",
        }
      },
      MuiTabs: { 
        flexContainer: { 
        alignItems: "center",
      backgroundColor:'#0a2f55' },
      flexContainerVertical:{
        alignItems: "stretch",

      }},
      //.MuiTab-textColorSecondary
      MuiButton:{
        textPrimary:{
color:'#ffffff99'
        },
        root: {
          color:'#ffffff99'
        }
      },
      MuiTab: {
        textColorSecondary: {
          color: "#000",
          backgroundColor: "#caa110 ",
          transitionDuration: "500ms",
          transitionProperty: "all",
          "&$selected": {
            color: "#caa110 ",
            backgroundColor: "#0a2f55 ",
          },
        },
        textColorPrimary: {
          borderRadius: "10px",
          // color: "#ffffffaa",
        },

        root: {
            // height: "min-content",
           '&$selected': {
            "&$selected": {
                color: "#caa110",
              },
           },
          "&:hover": {},
        },
      },
    },
  }),
}
