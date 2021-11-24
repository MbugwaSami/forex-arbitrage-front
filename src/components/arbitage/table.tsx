import React from "react";
import { Table } from "react-bootstrap";

import { Path } from "./";

export interface TableProps {
  data: Array<Path>;
}

const Arbitage: React.FC<TableProps> = (props) => {
  const { data } = props;
  return (
    <Table size="xl" striped hover>
      <thead>
        <tr>
          <th>Echange Path</th>
          <th>Exchange</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row, index) => {
          // if (index !== 0) {
          return (
            <tr key={index}>
              <td>{row.srcCurr + "==>" + row.destCurr}</td>
              <td>{row.rate}</td>
              <td>{row.arbitrage}</td>
            </tr>
          );
          // }
        })}
      </tbody>
    </Table>
  );
};

export default Arbitage;
