import React from "react";
import { withFormik } from "formik";
import * as Yup from 'yup';
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { values } from "lodash";



const styles = () => ({
    card: {
        maxWidth: 700,
        marginTop: 50,
        marginBottom: 50,

    },
    container: {
        display: "Flex",
        justifyContent: "center"
    },
    actions: {
        float: "right"
    }

});

const form = props => {
    const {
        classes,
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,

    } = props;

    return (


        <form
            onSubmit={handleSubmit}
        >
            <Card className={classes.card}>

                <CardContent>
                    <h4>Enter your details</h4>
                    <TextField
                        id="Name"
                        label="Name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.Name ? errors.Name : ""}
                        error={touched.Name && Boolean(errors.Name)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="contact_no"
                        label="Contact Number"
                        type="string"
                        value={values.contact_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.contact_no ? errors.contact_no : ""}
                        error={touched.contact_no && Boolean(errors.contact_no)}
                        margin="dense"
                        variant="outlined"
                        fullWidth

                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                 
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                        SUBMIT
                    </Button>
                    <Button color="secondary" onClick={handleReset}>
                        CLEAR
                    </Button>
                </CardActions>
            </Card>
        </form>



    );
};

const Form = withFormik({

    mapPropsToValues: ({
        Name,
        email,
        contact_no,
        password,
        confirmPassword,

    }) => {
        return {
            Name: Name || "",
            email: email || "",
            contact_no: contact_no || "",
            password: password || "",
            confirmPassword: confirmPassword || ""
        };
    },

    validationSchema: Yup.object().shape({
        Name: Yup.string().required("Required"),
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        contact_no: Yup.string()
            .min(10, "Enter a valid mobile number")
            .max(10, "Enter a valid mobile no")
            .required("Required"),
        password: Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Enter your password"),
        confirmPassword: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref("password")], "Password does not match")
    }),

   

    handleSubmit: (values,  { setSubmitting }) => {
       
       
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
       
       
    }
})(form);



export default withStyles(styles)(Form);