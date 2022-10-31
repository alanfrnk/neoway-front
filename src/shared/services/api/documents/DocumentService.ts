import { Environment } from '../../../environment';
import { api } from '../axios-config';


export interface IDocument {
  _id: string;
  documentNumber: number;
  type: string;
}

type TDocumentCount = {
  data: IDocument[];
  count: number;
}

const getAll = async (page = 1, filter = ''): Promise<TDocumentCount | Error> => {
  try {

    const { data, headers } = await api.get('/document', {
      params: { 
        page,
        limit: Environment.LIMITE_DE_LINHAS,
        like: filter,
      }
    });

    if (data.success) {
      return {
        data: data.data,
        count: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: string): Promise<IDocument | Error> => {
  try {
    const { data } = await api.get(`/document/${id}`);

    if (data.success) {
      return data.data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDocument, '_id'>): Promise<string | Error> => {
  try {
    const { data } = await api.post('/document', dados);

    if (data.success) {
      return data._id;
    }

    return new Error(`Erro ao criar o registro: ${data.error.message}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (_id: string, dados: IDocument): Promise<void | Error> => {
  try {
    const { data } = await api.put(`/document/${_id}`, dados);

    if (!data.success) {
      return new Error(`Erro ao criar o registro: ${data.error.message}`);
    }
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (_id: string): Promise<void | Error> => {
  try {
    await api.delete(`/document/${_id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const DocumentService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
