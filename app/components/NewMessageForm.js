import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'Your name must be at least ${min} characters.')
    .max(15, 'Your name cannot be more than ${max} characters.')
    .matches(/^[A-Za-z]+$/, 'Invalid name. Use Upper and Lowercase letters only.')
    .required('Your name is required.'),
  msgText: yup
    .string()
    .trim()
    .min(2, 'Your message must be at least ${min} characters.')
    .max(30, 'Your message must be no more than ${max} characters')
    .required('A message is required.')
});

const NewMessageForm = ({ addNewMessage }) => {
  
  const handleFormData = ( values, { resetForm, setSubmitting }) => {
      /* addNewMessage(values)
     * This is a function that needs to be passed to 
     * this Component and implemented in the Parent.
     * values will contain the data this Component 
     * collected from the Form and will be passed to
     * the Parent Component via this function.
     */
    addNewMessage(values);
    // reset the Form to prevent a double submit
    resetForm();
    // sets isSubmitting to false to finish submission
    setSubmitting(false);
  }
  
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Add a Message:</Card.Title>
        <Formik
          validationSchema={schema}
          onSubmit={handleFormData}
          initialValues={{ name: '', msgText: '' }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="align-items-center">
                <Form.Group as={Col} xs={4} className="mt-2" controlId="name">
                  <Form.Label>Enter a Name:</Form.Label>
                  <Form.Control
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mt-2" controlId="msgText">
                  <Form.Label>Enter Message:</Form.Label>
                  <Form.Control
                    placeholder="Your message"
                    value={values.msgText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.msgText && !errors.msgText}
                    isInvalid={touched.msgText && errors.msgText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.msgText}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}

export default NewMessageForm;
