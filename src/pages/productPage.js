import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { product } from "../product"
import { useExperiment } from "../context/ExperimentContext"
import { Table } from "../components/Table"

const Container = styled.div`
  background-color: #fff;
`

const ProductImage = styled.img`
  height: 300px;
  display: none;
`

const ProductAttr = styled.div`
  width: 60%;
`
const ProductAttrRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const ProductAttrColumn = styled.div``

const ExpData = styled.div`
  margin-top: 20px;
`

const getExperiments = query =>
  query.allExperimentsJson.edges.map(edge => edge.node)

export default ({ data }) => {
  const { getVariation, addExperiment } = useExperiment()
  const expData = getExperiments(data)
  if (expData.length > 0) {
    expData.forEach(exp =>
      addExperiment({
        id: exp.id,
        testCase: exp.id,
        variations: exp.variations,
      })
    )
  }
  return (
    <Container>
      <ProductImage
        className="defaultVariant-123abc"
        src={product.url}
      ></ProductImage>
      <ProductImage
        className="abtesting-123abc"
        src="http://images.squarespace-cdn.com/content/v1/59ab127a6f4ca38d477604a0/1507251290292-QOF0NVGXEOFO9ZK08V7N/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/proudly+sponsored+by+%281%29.png"
      ></ProductImage>
      <ProductAttr>
        Product Attributes:
        {Object.keys(product.attr).map(attr => (
          <ProductAttrRow>
            <ProductAttrColumn>{product.attr[attr].text}:</ProductAttrColumn>
            <ProductAttrColumn>{product.attr[attr].value}</ProductAttrColumn>
          </ProductAttrRow>
        ))}
      </ProductAttr>
      <ExpData>Variant: {getVariation("123abc")}</ExpData>
      {getVariation("234def") === 1 ? <Table /> : null}
    </Container>
  )
}

export const query = graphql`
  query MyQuery {
    allExperimentsJson {
      edges {
        node {
          id
          variations {
            css
            variant
            weight
          }
        }
      }
    }
  }
`
