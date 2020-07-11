import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import Web3 from "web3";

import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";
import loader from "../../../assets/loader.gif";
import {
  StyledForm,
  Left,
  Container,
  Right,
  RecentlySearched,
  Error,
  FieldWrap,
  TableContainer,
  Tooltip,
} from "./styles";
import Dropdown from "../../atoms/Dropdown";
import getEthInfo from "../../../lib/getEthInfo";
import QRModal from "./QRModal";

const Form = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearched, setLastSearched] = useState<string[]>([]);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [result, setResult] = useState<{
    address: string;
    balance: number;
    transactions: any[];
    qrCode: any;
  } | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleNetworkSelect = (value: string | null) => {
    setSelectedNetwork(value);
  };

  useEffect(() => {
    validateEthAddress(searchQuery);
  }, [searchQuery]);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const validateEthAddress = (value: string) => {
    if (value.length) {
      setIsAddressValid(Web3.utils.isAddress(value));
    } else {
      setIsAddressValid(true);
    }
  };

  const handleSearchAddress = async (event: MouseEvent) => {
    event.preventDefault();

    const newList = [...lastSearched];

    if (!lastSearched.includes(searchQuery)) {
      if (lastSearched.length >= 5) {
        newList.pop();
      }

      setLastSearched([searchQuery, ...newList]);
    }

    if (selectedNetwork) {
      setLoading(true);
      const info = await getEthInfo(searchQuery, selectedNetwork);
      setResult(info);
      setLoading(false);
    }
  };

  const canSubmit = searchQuery.length && isAddressValid && selectedNetwork;

  const columns = Object.keys(result?.transactions[0] || {});

  return (
    <Container>
      <Left>
        <StyledForm>
          <h5>Recent Searches</h5>
          <RecentlySearched>
            {lastSearched.length
              ? lastSearched.map((address, index) => (
                  <span key={index} onClick={() => setSearchQuery(address)}>
                    {address}
                  </span>
                ))
              : "none"}
          </RecentlySearched>
          <br />
          <FieldWrap>
            <TextField
              placeholder="Ethereum address"
              width="100%"
              value={searchQuery}
              height="50px"
              fontSize="16px"
              onChange={handleTextChange}
            />
            {!isAddressValid && <Error>Invalid Ethereum Address</Error>}
          </FieldWrap>
          <br />
          <br />
          <Dropdown
            selected={selectedNetwork}
            height="50px"
            fontSize="16px"
            selectText="Select Network"
            onSelect={handleNetworkSelect}
            options={[
              { label: "Rinkeby", value: "rinkeby" },
              { label: "Mainnet", value: "mainnet" },
            ]}
          />
          <br />
          <br />
          <Button
            height="50px"
            fontSize="16px"
            onClick={handleSearchAddress}
            disabled={!canSubmit}
          >
            Search
          </Button>
        </StyledForm>
      </Left>
      <Right>
        {isLoading ? (
          <img src={loader} alt="Loading..." width="60px" />
        ) : (
          result?.address && (
            <>
              <p>
                <b>Address:</b>{" "}
                <span>
                  <u onClick={() => setOpenModal(true)}>{result.address} </u>
                  {openModal && (
                    <QRModal closeModal={() => setOpenModal(false)}>
                      <img
                        src={result.qrCode}
                        alt={result.qrCode}
                        width="100%"
                      />
                    </QRModal>
                  )}
                </span>
              </p>
              <p>
                <b>Balance:</b> {result.balance}
              </p>
              <br />
              <p>
                <b>Transactions:</b>
              </p>
              <br />
              <TableContainer>
                {result.transactions.length ? (
                  <table>
                    <tbody>
                      <tr>
                        {columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                      {result.transactions.map((transaction: any) => {
                        return (
                          <tr key={transaction.hash}>
                            {columns.map((key) => (
                              <td key={key}>
                                {transaction[key]}
                                <Tooltip>{transaction[key]}</Tooltip>
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  "none"
                )}
              </TableContainer>
            </>
          )
        )}
      </Right>
    </Container>
  );
};

export default Form;
