import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

import ArbitageTable from "./table";
import { getData } from "../../axios";
import "./arbitage.css";

export interface ArbitagePath {
  maxPath: string;
  pathArray: Array<PathValue>;
}

export interface CurrencyResponse {
  currencies: Array<SelectOption>;
}

export interface PathValue {
  currency: string;
  rate: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

const Arbitage = () => {
  const [tableData, setTableData] = useState<Array<PathValue>>();
  const [currencyList, setCurrencyList] = useState<Array<SelectOption>>();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPopular = async () => {
      const data = await getData<CurrencyResponse>("/currencies");
      setCurrencyList(data?.currencies);
    };
    fetchPopular();
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedCurrency) {
      setError("Base Currency is required");
    } else {
      setIsLoading(true);
      const data = await getData<ArbitagePath>("/arbitage", { base: "usd" });
      if (data) {
        setTableData(data?.pathArray);
        setIsLoading(false);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target?.value;
    if (value) {
      setSelectedCurrency(value);
      setError("");
    }
  };

  return (
    <div className="d-flex p-3 justify-content-center h-75">
      <div className=" border-3 border  w-50 p-3 m-3 text-center">
        <h6 className="">Arbitage Path</h6>
        {tableData?.length ? (
          <ArbitageTable />
        ) : (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <p>Select Base Currency To View</p>
          </div>
        )}
      </div>
      <div className="border-3 border p-3 w-25 m-3">
        <h6 className="">Arbitage Calculator</h6>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Base Currency</Form.Label>
            <Form.Select
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option value="">Select base</option>
              {currencyList?.map((current) => {
                return <option value={current.value}>{current.label}</option>;
              })}
            </Form.Select>
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>
          <Button
            className="calculate-button"
            variant="primary"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Spinner animation="border" role="status"></Spinner>
            ) : (
              "Calculate"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Arbitage;
