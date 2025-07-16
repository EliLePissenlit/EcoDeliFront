import { useState } from 'react';

import {
  Box,
  Menu,
  Button,
  Dialog,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  Typography,
  DialogTitle,
  FormControl,
  ListItemIcon,
  ListItemText,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  PricingConfigsDocument,
  useActivatePricingConfigMutation,
  useDeactivatePricingConfigMutation,
} from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  allConfigs: any[];
  onSuccess?: VoidFunction;
};

export default function RowMoreMenu({ row, allConfigs, onSuccess }: Props) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const [activatePricingConfig] = useActivatePricingConfigMutation({
    refetchQueries: [PricingConfigsDocument],
  });
  const [deactivatePricingConfig] = useDeactivatePricingConfigMutation({
    refetchQueries: [PricingConfigsDocument],
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'activate' | 'deactivate';
  }>({
    open: false,
    action: 'activate',
  });
  const [selectConfigDialog, setSelectConfigDialog] = useState<{
    open: boolean;
    selectedConfigId: string;
  }>({
    open: false,
    selectedConfigId: '',
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirm = (action: 'activate' | 'deactivate') => {
    // Vérifier si on peut désactiver la configuration
    if (action === 'deactivate') {
      const activeConfigs = allConfigs.filter((config) => config.isActive);
      if (activeConfigs.length <= 1) {
        // Ouvrir la dialog de sélection de configuration
        const inactiveConfigs = allConfigs.filter((config) => !config.isActive);
        if (inactiveConfigs.length === 0) {
          enqueueSnackbar(
            t('sections.pricingAdministration.configs.notifications.no_inactive_configs'),
            { variant: 'warning' }
          );
          handleClose();
          return;
        }
        setSelectConfigDialog({
          open: true,
          selectedConfigId: inactiveConfigs[0]?.id || '',
        });
        handleClose();
        return;
      }
    }

    setConfirmDialog({ open: true, action });
    handleClose();
  };

  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, action: 'activate' });
  };

  const handleCloseSelectConfig = () => {
    setSelectConfigDialog({ open: false, selectedConfigId: '' });
  };

  const handleConfirmAction = async () => {
    try {
      if (confirmDialog.action === 'activate') {
        await activatePricingConfig({
          variables: {
            id: row.id,
          },
        });
        enqueueSnackbar(t('sections.pricingAdministration.configs.notifications.activate_success'));
      } else {
        await deactivatePricingConfig({
          variables: {
            id: row.id,
          },
        });
        enqueueSnackbar(
          t('sections.pricingAdministration.configs.notifications.deactivate_success')
        );
      }
      onSuccess?.();
    } catch (error) {
      enqueueSnackbar(
        confirmDialog.action === 'activate'
          ? t('sections.pricingAdministration.configs.notifications.activate_error')
          : t('sections.pricingAdministration.configs.notifications.deactivate_error'),
        { variant: 'error' }
      );
    }
    handleCloseConfirm();
  };

  const handleSelectConfigAndDeactivate = async () => {
    try {
      // D'abord activer la configuration sélectionnée
      await activatePricingConfig({
        variables: {
          id: selectConfigDialog.selectedConfigId,
        },
      });

      // Ensuite désactiver la configuration actuelle
      await deactivatePricingConfig({
        variables: {
          id: row.id,
        },
      });

      enqueueSnackbar(
        t('sections.pricingAdministration.configs.notifications.switch_config_success')
      );
      onSuccess?.();
    } catch (error) {
      enqueueSnackbar(
        t('sections.pricingAdministration.configs.notifications.switch_config_error'),
        { variant: 'error' }
      );
    }
    handleCloseSelectConfig();
  };

  const inactiveConfigs = allConfigs.filter((config) => !config.isActive);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => handleOpenConfirm(row.isActive ? 'deactivate' : 'activate')}
          sx={{
            ...(row.isActive && {
              color: 'error.main',
            }),
          }}
        >
          <ListItemIcon>
            <Iconify
              icon={row.isActive ? 'eva:close-circle-fill' : 'eva:checkmark-circle-2-fill'}
              sx={{
                ...(row.isActive && {
                  color: 'error.main',
                }),
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              row.isActive
                ? t('sections.pricingAdministration.configs.actions.deactivate')
                : t('sections.pricingAdministration.configs.actions.activate')
            }
          />
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={confirmDialog.open}
        onClose={handleCloseConfirm}
        title={t('components.dialog.confirm')}
        content={
          confirmDialog.action === 'activate'
            ? t('sections.pricingAdministration.configs.actions.activate')
            : t('sections.pricingAdministration.configs.actions.deactivate')
        }
        action={
          <Button
            variant="gradient"
            color={confirmDialog.action === 'activate' ? 'success' : 'error'}
            onClick={handleConfirmAction}
          >
            {confirmDialog.action === 'activate'
              ? t('sections.pricingAdministration.configs.actions.activate')
              : t('sections.pricingAdministration.configs.actions.deactivate')}
          </Button>
        }
      />

      {/* Dialog de sélection de configuration */}
      <Dialog
        open={selectConfigDialog.open}
        onClose={handleCloseSelectConfig}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('sections.pricingAdministration.configs.select_config.title')}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('sections.pricingAdministration.configs.select_config.description')}
            </Typography>
            <FormControl fullWidth>
              <InputLabel>
                {t('sections.pricingAdministration.configs.select_config.select_label')}
              </InputLabel>
              <Select
                value={selectConfigDialog.selectedConfigId}
                label={t('sections.pricingAdministration.configs.select_config.select_label')}
                onChange={(e) =>
                  setSelectConfigDialog((prev) => ({ ...prev, selectedConfigId: e.target.value }))
                }
              >
                {inactiveConfigs.map((config) => (
                  <MenuItem key={config.id} value={config.id}>
                    {config.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSelectConfig} color="inherit">
            {t('sections.pricingAdministration.configs.modal.cancel')}
          </Button>
          <Button
            variant="gradient"
            color="error"
            onClick={handleSelectConfigAndDeactivate}
            disabled={!selectConfigDialog.selectedConfigId}
          >
            {t('sections.pricingAdministration.configs.select_config.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
