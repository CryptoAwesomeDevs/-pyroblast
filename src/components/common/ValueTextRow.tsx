import styled from 'styled-components';
import React, { type FC, type ReactNode } from 'react';

const ValueTextRowContainer = styled.div({
  display: 'flex',
  width: '100%',
});

const RowText = styled.div({
  width: '100%',
});

const RowValue = styled.div({
  width: '100%',
  textAlign: 'right',
});

interface ValueTextRowProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: ReactNode | string;
  value?: ReactNode | string;
}

export const ValueTextRow: FC<ValueTextRowProps> = ({ text, value, ...rest }) => {
  return (
    <ValueTextRowContainer {...rest}>
      {text && <RowText>{text}</RowText>}
      {value && <RowValue>{value}</RowValue>}
    </ValueTextRowContainer>
  );
};
