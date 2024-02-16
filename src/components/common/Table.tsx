import React from 'react';
import styled from 'styled-components';

export interface Column<T> {
  key: string;
  name: React.ReactNode | string;
  render?: (value: T) => React.ReactNode | string;
  renderHeader?: (name: string) => string;
  hide?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  isLoading?: boolean;
}

const StyledTable = styled.div({
  width: '100%',
  display: 'table',
});

const StyledRow = styled.div({
  display: 'table-row',
  padding: '1rem 0',
  width: '100%',
});

const StyledCell = styled.div(({ theme }) => ({
  padding: '15px 12px',
  display: 'table-cell',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  borderBottom: `1px solid ${theme.colorTertiary}`,
}));

export const TableHeader = styled.div(({ theme }) => ({
  background: theme.bgColorQuaternary,
  borderBottomRightRadius: theme.primaryBorderRadius,
  borderBottomLeftRadius: theme.primaryBorderRadius,
  padding: '10px 20px',
  color: theme.bgColorTertiary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  width: 'max-content',
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <T extends Record<string, any>>({ columns, rows }: TableProps<T>) => {
  const getRowValue = (col: Column<T>, row: T) => col.render?.(row) ?? row[col.key];
  const visibleColumns = columns.filter((i) => !i.hide);

  return (
    <StyledTable>
      <StyledRow>
        {visibleColumns.map((col, index) => (
          <StyledCell key={index}>{col.name}</StyledCell>
        ))}
      </StyledRow>
      {rows.map((row, index) => (
        <StyledRow key={index}>
          {visibleColumns.map((col, index) => (
            <StyledCell
              key={index}
              data-title={col.name}
            >
              {getRowValue(col, row)}
            </StyledCell>
          ))}
        </StyledRow>
      ))}
    </StyledTable>
  );
};
