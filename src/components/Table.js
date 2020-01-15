import React from "react"
import styled from "styled-components"

const data = [
  { id: 1, text: "Important table of data" },
  { id: 2, text: "More important table of data" },
  { id: 3, text: "Duck Duck GOO" },
  { id: 4, text: "WHAT?" },
]
const TableContainer = styled.div`
  width: 300px;
  margin: 20px;
`
const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`
const Column = styled.div`
  margin-left: ${p => (p.firstColumn ? 0 : "15px")};
`

export const Table = () => {
  return (
    <TableContainer>
      {data.map(row => (
        <Row>
          <Column firstColumn={true}>{row.id}</Column>
          <Column>{row.text}</Column>
        </Row>
      ))}
    </TableContainer>
  )
}
