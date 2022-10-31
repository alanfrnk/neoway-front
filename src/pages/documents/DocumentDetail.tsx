import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { DocumentService } from '../../shared/services/api/documents/DocumentService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { DetailHelper } from '../../shared/components';
import { MainLayout } from '../../shared/layouts';


interface IFormData {
  documentNumber: number;
  type: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  documentNumber: yup.number().required().integer(),
  type: yup.string().required(),
});

export const DocumentDetail: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [documentNumber, setDocumentNumber] = useState(0);

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      DocumentService.getById(id)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/documents');
          } else {
            setDocumentNumber(result.documentNumber);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        documentNumber: '',
        type: '',
      });
    }
  }, [id]);


  const handleSave = (data: IFormData) => {

    formValidationSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          DocumentService
            .create(validateData)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                navigate('/documents');
              }
            });
        } else {
          DocumentService
            .updateById(id, { _id: id, ...validateData })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                navigate('/documents');
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: string) => {
    if (confirm('Realmente deseja apagar?')) {
      DocumentService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/documents');
          }
        });
    }
  };


  return (
    <MainLayout
      title={id === 'new' ? 'Novo Documento' : String(documentNumber)}
      buttons={
        <DetailHelper
          newButtonText='Novo'
          showSaveButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}

          onClickSave={save}
          onClickBack={() => navigate('/documents')}
          onClickDelete={() => handleDelete(id)}
          onClickNew={() => navigate('/documents/detail/new')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='documentNumber'
                  disabled={isLoading}
                  label='Número do documento'
                  onChange={e => setDocumentNumber(Number(e.target.value))}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='type'
                  label='Tipo'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </MainLayout>
  );
};
