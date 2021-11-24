import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

import ArbitageTable from "./table";
import { getData } from "../../axios";
import "./arbitage.css";

export interface Path {
  srcCurr: string;
  destCurr: string;
  arbitrage: number;
  rate: number;
}

export interface ArbitagePath {
  arbitrage: string;
  path: Array<Path>;
}

export interface CurrencyResponse {
  currencies?: Array<SelectOption>;
  error?: string;
}

export interface ArbitageResponse {
  arbitages?: Array<ArbitagePath>;
  max: ArbitagePath;
  error?: string;
}

export interface Arbitrage {
  arbitrage: number;
  path: Array<Path>;
}

export interface SelectOption {
  label: string;
  value: string;
}

const Arbitage = () => {
  const [tableData, setTableData] = useState<Array<Path>>();
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
      const data = await getData<ArbitageResponse>("/arbitage", {
        base: selectedCurrency,
      });
      if (data) {
        setIsLoading(false);
        if (data?.error) {
          setError(data?.error);
        } else {
          setTableData(data?.max.path);
        }
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
          <ArbitageTable data={tableData} />
        ) : (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <p>Select Base Currency To View</p>
          </div>
        )}
      </div>
      <div className="border-3 border p-3 w-25 m-3">
        <h6 className="">Arbitrage Calculator</h6>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Base Currency</Form.Label>
            <Form.Select
              onChange={handleChange}
              aria-label="Select Base Currency<"
            >
              <option value="">Select base</option>
              {currencyList?.map((current, index) => {
                return (
                  <option key={index} value={current.value}>
                    {current.label}
                  </option>
                );
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
