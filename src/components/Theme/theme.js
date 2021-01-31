import { Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const Violet = "#782387" ;
const White = "#00000" ;

export default createMuiTheme({
    palette:{
        common:{
            blue : `${Violet}` ,
            white : `${White}`
        },
        primary:{
            main :`${White}`
        },
        secondary:{
            main: `${Violet}`
        }

    },
});