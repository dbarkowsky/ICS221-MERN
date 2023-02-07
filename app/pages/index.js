'use client'

import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import { Container, Row, Col } from "react-bootstrap";
import FormTable from "@/composites/FormTable";
import axios from 'axios'

export async function getStaticProps() {
  let jsonData;
  try {
    const { data } = await
      axios.get('http://localhost:3004/api/messages');
    jsonData = data;
  } catch (error) {
    console.log('API Error: ' + error);
  }
  return {
    props: {
      jsonData
    }
  }
}

export default function Home({jsonData}) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <PageHeader />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={8}>
          <FormTable {...{jsonData}}/>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={8}>
          <PageFooter year={new Date().getFullYear()} />
        </Col>
      </Row>
    </Container>
  );
}
