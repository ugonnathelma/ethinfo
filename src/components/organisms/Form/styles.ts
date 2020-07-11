import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2em;
  position: relative;
  h5 {
    margin: 0.5em 0em;
  }
`;

export const Left = styled.div`
  flex: 1;
  padding: 2em;
  min-width: 490px;
  display: flex;
  flex-direction: column;
`;

export const Right = styled.div`
  flex: 1;
  min-width: 490px;
  padding: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  u {
    cursor: pointer;
  }

  p {
    width: 100%;
    text-align: left;
  }

  span {
    position: relative;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Error = styled.div`
  font-size: 11px;
  color: red;
  position: absolute;
`;

export const FieldWrap = styled.div`
  position: relative;
`;

export const RecentlySearched = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  span {
    margin: 0em 1em 0.5em 0em;
    text-decoration: underline;
    cursor:pointer;
  }

  span:hover {
    color:${({ theme: { colors } }) => colors.secondary};


`;

export const Tooltip = styled.div`
  position: absolute;
  display: none;
  background: ${({ theme: { colors } }) => colors.primary};
  color: white;
  padding: 0.7em;
  margin-bottom: 20px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;

  table {
    border-collapse: collapse;
    border-spacing: 0 50px;
  }

  td,
  th {
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 1em;
    max-width: 300px;
  }

  tr {
    margin-bottom: 10px;
    height: 2.5em;
  }

  tr:nth-child(odd) {
    background-color: ${({ theme: { colors } }) => colors.grey1};
  }

  th {
    background-color: ${({ theme: { colors } }) => colors.primary};
    color: white;
    text-transform: uppercase;
  }

  td:hover ${Tooltip} {
    display: block;
  }
`;
