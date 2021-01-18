import React from 'react';
import NavBar from '../../components/Layout/NavBar/NavBar';

import { makeStyles } from '@material-ui/core/styles';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Grid,
	Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Form from '../../Pages/Settings/Form'


const useStyles = makeStyles({
	container: {
		backgroundColor: '#fffff',
		height: '100vh'
	},

	accordian: {
		width: "100%",
		alignSelf: "center"

	}
});



export default function UpdateSettings() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<NavBar />
			<div className={classes.container}>
				<h2 style={{ marginTop: '2em' }}>Settings</h2>

				<div container style={{ marginTop: '2em' }}>
					<Grid container>
						<Grid item sm={12} md={12}>
							<div className={classes.accordian}>


								<Accordion >
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography variant="h6">Update Details</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Grid container xs={12} sm={12} style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}}>
											<Form></Form>
										</Grid>

									</AccordionDetails>
								</Accordion>


								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography variant="h6">Forgot Password</Typography>
									</AccordionSummary>
									<AccordionDetails>

										<Grid container xs={12} sm={12} style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}} >

											<Grid items xs={12} sm={6} style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center'
											}}>
												<Typography variant="p">
													You will be sent a verification code at your email ID
												</Typography>
											</Grid>

											<Grid items xs={12} sm={6}style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center'
											}}>
												<Button variant="contained" color="secondary" style={{ marginLeft: "20px" }} >Reset Password</Button>
											</Grid>


										</Grid>
									</AccordionDetails>
								</Accordion>

								
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography variant="h6">Delete account  </Typography>
									</AccordionSummary>
									<AccordionDetails>

										<Grid container xs={12} sm={12} style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}} >

											<Grid items xs={12} sm={6}>
												<Typography variant="p">
													Your account will be permanantly deleted and all the data will be lost . Are you sure you want to delete?
											</Typography>
											</Grid>

											<Grid items xs={12} sm={6}>
												<Button variant="contained" color="secondary" style={{ marginLeft: "20px" }} >Yes</Button>
											</Grid>

										</Grid>
									</AccordionDetails>
								</Accordion>

								

							</div>
						</Grid>
					</Grid>
				</div>
			</div>


		</React.Fragment>
	)
}
