import styled from "styled-components";

export const StyledOption = styled.div<{
  defaultOption?: boolean;
  key?: number;
}>`
  display: flex;
  align-items: center;
  transition: background: 0.3s;
  cursor: pointer;

  ${({ defaultOption, theme: { colors } }) =>
    defaultOption && `color:${colors.grey}`};
`;

export const Options = styled.div`
  position: absolute;
  background: white;
  width: 100%;
  left: 0;
  margin-top: 3px;
  box-shadow: 0px 0px 3px 0px rgba(106, 137, 204, 1);

  ${StyledOption} {
    padding: 0em 1em;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.grey};
  }

  ${StyledOption}:hover {
    background: ${({ theme: { colors } }) => colors.primary};
    color: white;
  }
`;

export const StyledSelect = styled.div<{
  fontSize?: string;
  width?: string;
  height?: string;
}>`
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
  padding: 0px 1em;
  border: 1px solid ${({ theme: { colors } }) => colors.grey};
  border-radius: 3px;
  outline: 0;
  position: relative;
  &:focus {
    outline: 1px solid ${({ theme: { colors } }) => colors.primary};
    outline-offset: -2px;
  }

  ${StyledOption} {
    ${({ width }) => width && `width: ${width}`};
    ${({ height }) => height && `height: ${height}`};
    ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
  }

  & > ${StyledOption}:first-child:after {
    content: "▼";
    position: absolute;
    right: 1em;
    margin: 0 auto;
    color: ${({ theme: { colors } }) => colors.primary};
    font-size: 12px;
  }
`;
