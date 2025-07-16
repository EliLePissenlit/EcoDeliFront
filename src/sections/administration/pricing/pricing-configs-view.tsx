import { useState } from 'react';

import { Card, Table, Container, TableBody, TableContainer } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import { TableNoData } from 'src/components/table/table-no-data';
import { TableEmptyRows } from 'src/components/table/table-empty-rows';

import { usePricingConfigsQuery } from 'src/types/graphql/typeDefs';

import SkeletonRow from './components/skeleton-row';
import PricingConfigModal from './components/pricing-config-modal';
import PricingConfigsTableRow from './components/pricing-config-row';
import PricingConfigsTableHead from './components/pricing-configs-table-head';
import PricingConfigsTableToolbar from './components/pricing-configs-table-toolbar';

// ----------------------------------------------------------------------

export default function PricingConfigsView() {
  const { t } = useTranslate();

  const TABLE_HEAD = [
    { id: 'name', label: t('sections.pricingAdministration.configs.table.name'), width: 200 },
    {
      id: 'basePriceSmall',
      label: t('sections.pricingAdministration.configs.table.base_price_small'),
      width: 120,
    },
    {
      id: 'basePriceMedium',
      label: t('sections.pricingAdministration.configs.table.base_price_medium'),
      width: 120,
    },
    {
      id: 'basePriceLarge',
      label: t('sections.pricingAdministration.configs.table.base_price_large'),
      width: 120,
    },
    {
      id: 'pricePerKm',
      label: t('sections.pricingAdministration.configs.table.price_per_km'),
      width: 100,
    },
    {
      id: 'pricePerMinute',
      label: t('sections.pricingAdministration.configs.table.price_per_minute'),
      width: 100,
    },
    { id: 'isActive', label: t('sections.pricingAdministration.configs.table.status'), width: 100 },
    {
      id: 'createdAt',
      label: t('sections.pricingAdministration.configs.table.created'),
      width: 160,
    },
    { id: '', width: 88 },
  ];
  const {
    data: pricingConfigsData,
    loading: pricingConfigsLoading,
    refetch,
  } = usePricingConfigsQuery();

  const [filters, setFilters] = useState({
    name: '',
  });

  const confirm = useBoolean();

  const denseHeight = 72;

  const dataFiltered =
    pricingConfigsData?.pricingConfigs?.filter((item: any) => {
      const { name } = filters;
      const filteredByName = !name || item.name.toLowerCase().includes(name.toLowerCase());
      return filteredByName;
    }) || [];

  const notFound = !pricingConfigsLoading && dataFiltered.length === 0;

  const handleFilters = (name: string, value: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateNew = () => {
    confirm.onTrue();
  };

  const handleCloseModal = () => {
    confirm.onFalse();
  };

  const handleModalSuccess = () => {
    refetch();
    handleCloseModal();
  };

  return (
    <Container maxWidth={false} sx={{ p: 2 }}>
      <Card>
        <PricingConfigsTableToolbar
          filters={filters}
          onFilters={handleFilters}
          onCreateNew={handleCreateNew}
        />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Table size="medium" sx={{ minWidth: 960 }}>
            <PricingConfigsTableHead
              order="asc"
              orderBy=""
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
            />

            <TableBody>
              {pricingConfigsLoading
                ? [...Array(12)].map((_, index) => <SkeletonRow key={index} />)
                : dataFiltered.map((row: any) => (
                    <PricingConfigsTableRow
                      key={row.id}
                      row={row}
                      allConfigs={pricingConfigsData?.pricingConfigs || []}
                      onSuccess={refetch}
                    />
                  ))}

              <TableEmptyRows height={denseHeight} emptyRows={0} />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <PricingConfigModal
        open={confirm.value}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        type="create"
      />
    </Container>
  );
}
