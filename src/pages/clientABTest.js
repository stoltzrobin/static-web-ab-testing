import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { product } from "../product"
import { useExperiment } from "../context/ExperimentContext"

const Container = styled.div`
  background-color: #fff;
`

const ProductImage = styled.img`
  height: 300px;
`

const ProductAttr = styled.div`
  width: 60%;
`
const ProductAttrRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const ProductAttrColumn = styled.div``

const getExperiments = query =>
  query.allExperimentsJson.edges.map(edge => edge.node)

export default ({ data }) => {
  const { getVariation, addExperiment } = useExperiment()
  const [variation, setVariation] = useState(false)
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
  useEffect(() => {
    setVariation(getVariation("234def"))
  }, [])

  const image = variation ? (
    <ProductImage src={product.url} />
  ) : (
    <ProductImage src="http://images.squarespace-cdn.com/content/v1/59ab127a6f4ca38d477604a0/1507251290292-QOF0NVGXEOFO9ZK08V7N/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/proudly+sponsored+by+%281%29.png" />
  )
  console.log("Variant: ", variation)
  return (
    <Container>
      {image}
      <ProductAttr>
        Product Attributes:
        {Object.keys(product.attr).map(attr => (
          <ProductAttrRow>
            <ProductAttrColumn>{product.attr[attr].text}:</ProductAttrColumn>
            <ProductAttrColumn>{product.attr[attr].value}</ProductAttrColumn>
          </ProductAttrRow>
        ))}
      </ProductAttr>
      {variation === 1 ? "HEJSAN" : "HEJDÅ!!!"}
    </Container>
  )
}

export const query = graphql`
  query clientABTest {
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
