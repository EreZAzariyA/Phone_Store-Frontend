import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

const storeName = "E.A Phone Store";

const AboutPage = () => {
      return (
            <Container>
                  <Row>
                        <h1>About Page</h1>
                  </Row>
                  <Row>
                        <p>Welcome to <strong>"{storeName}"</strong> by <strong>"E.A Stores"</strong>.</p>
                  </Row>
                  <Row>
                        <Col md='6' className="m-auto">
                              <Form>
                                    <Form.Text>
                                          
                                    </Form.Text>
                                    <FloatingLabel className="mt-2" label="Name">
                                          <Form.Control type="text" />
                                    </FloatingLabel>

                                    <FloatingLabel className="mt-2" label="Email">
                                          <Form.Control type="text" />
                                    </FloatingLabel>

                                    <FloatingLabel className="mt-2" label="Subject">
                                          <Form.Control type="text" />
                                    </FloatingLabel>

                                    <FloatingLabel className="mt-2" label="Message">
                                          <Form.Control as={'textarea'}
                                                style={{ height: '100px' }} />
                                    </FloatingLabel>

                              </Form>
                        </Col>
                  </Row>

            </Container>
      );
}

export default AboutPage;