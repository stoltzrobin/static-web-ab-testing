import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { Navigator } from "../components/Navigator"
import { product } from "../product"
import { useExperiment } from "../context/ExperimentContext"

const Container = styled.div`
  background-color: #fff;
`

const ProductImage = styled.img`
  width: 30%;
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
  console.log("data: ", expData)
  if (expData) {
    expData.forEach(exp =>
      addExperiment({ id: exp.id, testCase: exp.id, variations: exp.variations })
    )
  }
  return (
    <Container>
      <ProductImage src={product.url}></ProductImage>
      <ProductAttr>
        Product Attributes:
        {Object.keys(product.attr).map(attr => (
          <ProductAttrRow>
            <ProductAttrColumn>{product.attr[attr].text}:</ProductAttrColumn>
            <ProductAttrColumn>{product.attr[attr].value}</ProductAttrColumn>
          </ProductAttrRow>
        ))}
      </ProductAttr>
      <ExpData>Variant: {getVariation()}</ExpData>
    </Container>
  )
}

export const query = graphql`
  query MyQuery {
    allExperimentsJson {
      edges {
        node {
          id
          variants {
            css
            variant
            weight
          }
        }
      }
    }
  }
`
