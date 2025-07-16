import React from 'react';
import { QueryResult, OperationVariables } from '@apollo/client';

type QueryResultProps<TData, TVariables extends OperationVariables> = QueryResult<
  TData,
  TVariables
> & {
  skeleton?: React.ReactNode;
  children: (data: TData) => JSX.Element | null;
};

function QueryResultComponent<TData, TVariables extends OperationVariables>({
  loading,
  data,
  error,
  skeleton,
  children,
}: QueryResultProps<TData, TVariables>) {
  if (loading) return skeleton || null;

  if (error) return <div>Error! {error.message}</div>;

  if (data) return children(data);

  return null;
}

export default QueryResultComponent;
