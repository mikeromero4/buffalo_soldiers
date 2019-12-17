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
        // paper: "#fff",
        // default: "#fff",
      },
    },
    overrides: {
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
      MuiTabs: { flexContainer: { alignItems: "center",backgroundColor:'#0a2f55' } },
      //.MuiTab-textColorSecondary
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
