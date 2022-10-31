import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IDetailHelperProps {
  newButtonText?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;

  onClickNew?: () => void;
  onClickBack?: () => void;
  onClickDelete?: () => void;
  onClickSave?: () => void;
}
export const DetailHelper: React.FC<IDetailHelperProps> = ({
  newButtonText = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,

  onClickNew,
  onClickBack,
  onClickDelete,
  onClickSave,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >

      {(showSaveButton && !showSaveButtonLoading && !smDown && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickSave}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}

      {(showSaveButtonLoading && !smDown && !mdDown) && (
        <Skeleton width={180} height={60} />
      )}

      {
        (
          showBackButton &&
          (showNewButton || showDeleteButton || showSaveButton)
        ) && (
          <Divider variant='middle' orientation='vertical' />
        )
      }

      {(showBackButton && !showBackButtonLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickBack}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Voltar
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && (
        <Skeleton width={110} height={60} />
      )}
    </Box >
  );
};
