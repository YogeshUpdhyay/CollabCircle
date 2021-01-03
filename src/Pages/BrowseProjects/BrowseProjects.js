import { divide } from "lodash";
import React from "react";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer/Footer";

import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Card,
  Button,
  CardHeader,
  CardMedia,
  CardContent,
  Collapse,
  Avatar,
  IconButton,
  FavoriteIcon,
  ShareIcon,
  ExpandMoreIcon,
  MoreVertIcon,
  Divider,
} from "@material-ui/core";

import SearchBar from "material-ui-search-bar";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import idea from "../../assets/idea.png";
import "./BrowseProjects.css";

const useStyles = makeStyles((muiBaseTheme) => ({
  card: {
    maxWidth: 350,
    height: 700,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "25.25%",
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
}));

export default function BrowseProjects() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <NavBar />
      <div style={{ backgroundColor: "white" }}>
        <React.Fragment>
          <CssBaseline />
          <Grid className="banner_browseprojects"></Grid>
          <br />
          <div>
            <br></br>
            <SearchBar className="search_bar" placeholder="Browse Projects" />
          </div>
          <br />
          <Container>

          </Container>
          <Grid container spacing={3}>
            <Grid item xs>
              <Card className={classes.card}>
                <CardMedia className={classes.media}>
                  <img src={idea} className="bulb" />
                </CardMedia>
                <CardContent className={classes.content}>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h4"}
                    gutterBottom
                  >
                    Project1
                  </Typography>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant={"h6"}
                  >
                    Creators
                  </Typography>
                  <Typography
                    className={"MuiTypography--paragraph"}
                    variant={"caption"}
                  >
                    Description-Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer t
                  </Typography>
                  <button className = "button button_view_project">
                    View Project
                  </button>

                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
              <Card className={classes.card}>
                <CardMedia className={classes.media}>
                  <img src={idea} className="bulb" />
                </CardMedia>
                <CardContent className={classes.content}>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h4"}
                    gutterBottom
                  >
                    Project1
                  </Typography>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant={"h6"}
                  >
                    Creators
                  </Typography>
                  <Typography
                    className={"MuiTypography--paragraph"}
                    variant={"caption"}
                  >
                    Description-Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer t
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
              <Card className={classes.card}>
                <CardMedia className={classes.media}>
                  <img src={idea} className="bulb" />
                </CardMedia>
                <CardContent className={classes.content}>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h4"}
                    gutterBottom
                  >
                    Project1
                  </Typography>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant={"h6"}
                  >
                    Creators
                  </Typography>
                  <Typography
                    className={"MuiTypography--paragraph"}
                    variant={"caption"}
                  >
                    Description-Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer t
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
         
        </React.Fragment>
      </div>

      <Footer />
    </div>
  );
}
