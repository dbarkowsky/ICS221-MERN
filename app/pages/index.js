'use client'

import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import { Container, Row, Col } from "react-bootstrap";
import FormTable from "@/composites/FormTable";
import axios from 'axios';
import { gql } from '@apollo/client';
import client from '../apollo-client';

export async function getStaticProps() {
  let jsonData;
  try {
    // const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/messages`);
    const { data } = await client.query({
      query: gql`
        query GetMessages {
          messages {
            id
            name
            msgText
          }
        }
      `
    })
    jsonData = data.messages;
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
