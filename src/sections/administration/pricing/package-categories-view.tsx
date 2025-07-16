import { useState } from 'react';

import {
  Box,
  Card,
  Table,
  Stack,
  Alert,
  Button,
  Select,
  TableRow,
  MenuItem,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  InputLabel,
  FormControl,
  TableContainer,
} from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';

import { RHFLocation } from 'src/components/hook-form';
import { TableNoData } from 'src/components/table/table-no-data';

import {
  PackageCategory,
  useGetPackageCategoriesQuery,
  useCalculatePriceRangeFromGeoDataQuery,
} from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type AddressData = {
  mainText: string;
  secondaryText: string;
  lat: number;
  lng: number;
  placeId: string;
  fullAddress: string;
  locationType: 'GPS_LOCATION';
};

export default function PackageCategoriesView() {
  const { t } = useTranslate();
  const { data: categoriesData, loading: categoriesLoading } = useGetPackageCategoriesQuery();

  const [startAddress, setStartAddress] = useState<AddressData | null>(null);
  const [endAddress, setEndAddress] = useState<AddressData | null>(null);
  const [packageCategory, setPackageCategory] = useState<PackageCategory>(PackageCategory.Small);

  const [calculatePrice, setCalculatePrice] = useState(false);

  const {
    data: priceRangeData,
    loading: priceRangeLoading,
    error: priceRangeError,
  } = useCalculatePriceRangeFromGeoDataQuery({
    variables: {
      input: {
        start: startAddress ? { lat: startAddress.lat, lon: startAddress.lng } : { lat: 0, lon: 0 },
        relayPointId: endAddress ? endAddress.placeId : '',
        packageCategory,
      },
    },
    skip: !calculatePrice || !startAddress || !endAddress,
  });

  const notFound = !categoriesLoading && !categoriesData?.getPackageCategories?.length;

  const handleStartAddressSelect = (place: any) => {
    const addressData: AddressData = {
      mainText: place.name || '',
      secondaryText: place.formatted_address || '',
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
      placeId: place.place_id,
      fullAddress: place.formatted_address,
      locationType: 'GPS_LOCATION',
    };
    setStartAddress(addressData);
  };

  const handleEndAddressSelect = (place: any) => {
    const addressData: AddressData = {
      mainText: place.name || '',
      secondaryText: place.formatted_address || '',
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
      placeId: place.place_id,
      fullAddress: place.formatted_address,
      locationType: 'GPS_LOCATION',
    };
    setEndAddress(addressData);
  };

  const handleCalculatePrice = () => {
    setCalculatePrice(true);
  };

  const handleResetCalculation = () => {
    setCalculatePrice(false);
    setStartAddress(null);
    setEndAddress(null);
  };

  const canCalculate = startAddress && endAddress;

  return (
    <Container maxWidth={false} sx={{ p: 2 }}>
      {/* Simulation de calcul de prix */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('sections.pricingAdministration.categories.simulation.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t('sections.pricingAdministration.categories.simulation.description')}
          </Typography>

          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <Typography variant="subtitle2" sx={{ minWidth: 120, pt: 1 }}>
              {t('sections.pricingAdministration.categories.simulation.start_point')}
            </Typography>
            <Box sx={{ flex: 1 }}>
              <RHFLocation
                label={t('sections.pricingAdministration.categories.simulation.start_address')}
                onSelect={handleStartAddressSelect}
                required
              />
              {startAddress && (
                <Box sx={{ mt: 1, p: 1, bgcolor: 'background.neutral', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {startAddress.fullAddress}
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>

          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ minWidth: 120, pt: 1 }}>
              {t('sections.pricingAdministration.categories.simulation.end_point')}
            </Typography>
            <Box sx={{ flex: 1 }}>
              <RHFLocation
                label={t('sections.pricingAdministration.categories.simulation.end_address')}
                onSelect={handleEndAddressSelect}
                required
              />
              {endAddress && (
                <Box sx={{ mt: 1, p: 1, bgcolor: 'background.neutral', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {endAddress.fullAddress}
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>

          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ minWidth: 120, pt: 1 }}>
              {t('sections.pricingAdministration.categories.simulation.category')}
            </Typography>
            <FormControl sx={{ width: 200 }}>
              <InputLabel>
                {t('sections.pricingAdministration.categories.simulation.package_category')}
              </InputLabel>
              <Select
                value={packageCategory}
                label={t('sections.pricingAdministration.categories.simulation.package_category')}
                onChange={(e) => setPackageCategory(e.target.value as PackageCategory)}
              >
                <MenuItem value={PackageCategory.Small}>
                  {t('sections.pricingAdministration.categories.package_types.small')}
                </MenuItem>
                <MenuItem value={PackageCategory.Medium}>
                  {t('sections.pricingAdministration.categories.package_types.medium')}
                </MenuItem>
                <MenuItem value={PackageCategory.Large}>
                  {t('sections.pricingAdministration.categories.package_types.large')}
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="gradient"
              onClick={handleCalculatePrice}
              disabled={priceRangeLoading || !canCalculate}
            >
              {t('sections.pricingAdministration.categories.simulation.calculate_price')}
            </Button>
            {calculatePrice && (
              <Button variant="gradient" onClick={handleResetCalculation}>
                {t('sections.pricingAdministration.categories.simulation.reset')}
              </Button>
            )}
          </Stack>

          {priceRangeError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {t('sections.pricingAdministration.categories.simulation.calculation_error')}{' '}
              {priceRangeError.message}
            </Alert>
          )}

          {priceRangeData && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {t('sections.pricingAdministration.categories.simulation.result_title')}
              </Typography>
              <Stack spacing={1}>
                <Typography>
                  {t('sections.pricingAdministration.categories.simulation.min_price')}{' '}
                  <strong>
                    {fCurrency(priceRangeData.calculatePriceRangeFromGeoData.minPriceInCents / 100)}
                  </strong>
                </Typography>
                <Typography>
                  {t('sections.pricingAdministration.categories.simulation.max_price')}{' '}
                  <strong>
                    {fCurrency(priceRangeData.calculatePriceRangeFromGeoData.maxPriceInCents / 100)}
                  </strong>
                </Typography>
                <Typography>
                  {t('sections.pricingAdministration.categories.simulation.estimated_distance')}{' '}
                  <strong>
                    {(
                      priceRangeData.calculatePriceRangeFromGeoData.estimatedDistanceInMeters / 1000
                    ).toFixed(2)}{' '}
                    {t('sections.pricingAdministration.categories.simulation.km')}
                  </strong>
                </Typography>
                <Typography>
                  {t('sections.pricingAdministration.categories.simulation.estimated_duration')}{' '}
                  <strong>
                    {Math.round(
                      priceRangeData.calculatePriceRangeFromGeoData.estimatedDurationInMinutes
                    )}{' '}
                    {t('sections.pricingAdministration.categories.simulation.minutes')}
                  </strong>
                </Typography>
              </Stack>
            </Box>
          )}
        </Box>
      </Card>

      {/* Liste des catégories */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('sections.pricingAdministration.categories.list.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('sections.pricingAdministration.categories.list.description')}
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('sections.pricingAdministration.categories.list.category')}</TableCell>
              <TableCell>
                {t('sections.pricingAdministration.categories.list.description')}
              </TableCell>
              <TableCell align="right">
                {t('sections.pricingAdministration.categories.list.max_volume')}
              </TableCell>
              <TableCell align="right">
                {t('sections.pricingAdministration.categories.list.max_weight')}
              </TableCell>
              <TableCell>{t('sections.pricingAdministration.categories.list.emoji')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categoriesData?.getPackageCategories?.map((category) => (
              <TableRow key={category.category} hover>
                <TableCell>
                  <Typography variant="subtitle2">{category.category}</Typography>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell align="right">{category.maxVolume}</TableCell>
                <TableCell align="right">{category.maxWeight}</TableCell>
                <TableCell>
                  <Typography variant="h5">{category.emoji}</Typography>
                </TableCell>
              </TableRow>
            ))}

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
