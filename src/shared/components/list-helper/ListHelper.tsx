import { Box, Button, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IListHelperProps {
  searchText?: string;
  showSearch?: boolean;
  onChangeText?: (novoTexto: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  onClickNew?: () => void;
}
export const ListHelper: React.FC<IListHelperProps> = ({
  searchText = '',
  showSearch = false,
  onChangeText,
  newButtonText = 'Novo',
  showNewButton = true,
  onClickNew,
}) => {
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
      {showSearch && (
        <TextField
          size="small"
          value={searchText}
          placeholder={Environment.INPUT_DE_BUSCA}
          onChange={(e) => onChangeText?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={onClickNew}
          >{newButtonText}</Button>
        )}
      </Box>
    </Box>
  );
};
