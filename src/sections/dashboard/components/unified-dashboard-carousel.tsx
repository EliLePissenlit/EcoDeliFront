import { useState, useEffect } from 'react';

import { Box, Card, Stack, Tooltip, Typography, IconButton } from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import WithRoles from 'src/components/with-roles';

import PendingTasksCarousel from './pending-tasks-carousel';
import TasksToStartCarousel from './tasks-to-start-carousel';
import TasksToCloseCarousel from './tasks-to-close-carousel';
import TasksToValidateCarousel from './tasks-to-validate-carousel';
import MyTasksWithApplicationsCarousel from './my-tasks-with-applications-carousel';

export default function UnifiedDashboardCarousel() {
  const { t } = useTranslate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { user } = useAuth();

  // Configuration des sections
  const sections = [
    {
      id: 'pending-tasks',
      title: t('dashboard.sections.pending_tasks.title'),
      icon: 'mdi:clock-outline',
      tooltip: t('dashboard.sections.pending_tasks.tooltip'),
      component: PendingTasksCarousel,
      roles: ['ADMIN', 'SUPER_ADMIN'],
    },
    {
      id: 'tasks-to-start',
      title: t('dashboard.sections.tasks_to_start.title'),
      icon: 'mdi:play-circle-outline',
      tooltip: t('dashboard.sections.tasks_to_start.tooltip'),
      component: TasksToStartCarousel,
      roles: ['ADMIN', 'SUPER_ADMIN', 'BASIC', 'PARTNER'],
    },
    {
      id: 'tasks-to-close',
      title: t('dashboard.sections.tasks_to_close.title'),
      icon: 'mdi:check-circle-outline',
      tooltip: t('dashboard.sections.tasks_to_close.tooltip'),
      component: TasksToCloseCarousel,
      roles: ['ADMIN', 'SUPER_ADMIN', 'BASIC', 'PARTNER'],
    },
    {
      id: 'tasks-to-validate',
      title: t('dashboard.sections.tasks_to_validate.title'),
      icon: 'mdi:shield-check-outline',
      tooltip: t('dashboard.sections.tasks_to_validate.tooltip'),
      component: TasksToValidateCarousel,
      roles: ['ADMIN', 'SUPER_ADMIN', 'BASIC', 'PARTNER'],
    },
    {
      id: 'my-tasks-with-applications',
      title: t('dashboard.sections.my_tasks_with_applications.title'),
      icon: 'mdi:account-multiple-outline',
      tooltip: t('dashboard.sections.my_tasks_with_applications.tooltip'),
      component: MyTasksWithApplicationsCarousel,
      roles: ['ADMIN', 'SUPER_ADMIN', 'BASIC', 'PARTNER'],
    },
  ];

  const filteredSections = sections.filter((section) => section.roles.includes(user?.role || ''));

  useEffect(() => {
    if (currentSectionIndex >= filteredSections.length && filteredSections.length > 0) {
      setCurrentSectionIndex(0);
    }
  }, [filteredSections.length, currentSectionIndex]);

  const handlePrevious = () => {
    setCurrentSectionIndex((prev) => (prev > 0 ? prev - 1 : filteredSections.length - 1));
  };

  const handleNext = () => {
    setCurrentSectionIndex((prev) => (prev < filteredSections.length - 1 ? prev + 1 : 0));
  };

  // Si aucune section n'est disponible pour l'utilisateur
  if (filteredSections.length === 0) {
    return (
      <Card sx={{ p: 2 }} variant="blur">
        <Stack spacing={1.5} alignItems="center">
          <Typography variant="subtitle1" color="text.secondary">
            {t('dashboard.sections.no_section_for_role')}
          </Typography>
        </Stack>
      </Card>
    );
  }

  const currentSection = filteredSections[currentSectionIndex];
  const CurrentComponent = currentSection.component;

  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        {/* En-tête compact avec titre et navigation */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle1" fontWeight="medium">
              {currentSection.title}
            </Typography>
            <Tooltip title={currentSection.tooltip} arrow>
              <Iconify icon={currentSection.icon} width={16} />
            </Tooltip>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              onClick={handlePrevious}
              size="small"
              sx={{ p: 0.5 }}
              disabled={filteredSections.length <= 1}
            >
              <Iconify icon="mdi:chevron-left" width={16} />
            </IconButton>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ minWidth: 30, textAlign: 'center' }}
            >
              {currentSectionIndex + 1}/{filteredSections.length}
            </Typography>
            <IconButton
              onClick={handleNext}
              size="small"
              sx={{ p: 0.5 }}
              disabled={filteredSections.length <= 1}
            >
              <Iconify icon="mdi:chevron-right" width={16} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Contenu de la section actuelle */}
        <Box data-section={currentSection.id}>
          <WithRoles roles={currentSection.roles} excludeRoleHierarchy>
            <CurrentComponent />
          </WithRoles>
        </Box>

        {/* Indicateurs de navigation compacts */}
        {filteredSections.length > 1 && (
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            {filteredSections.map((section, index) => (
              <Box
                key={section.id}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: index === currentSectionIndex ? 'primary.main' : 'divider',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    bgcolor: index === currentSectionIndex ? 'primary.dark' : 'grey.400',
                  },
                }}
                onClick={() => setCurrentSectionIndex(index)}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
