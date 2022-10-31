import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import {
  DocumentDetail,
  DocumentList,
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'document',
        path: '/documents',
        label: 'Documentos',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/documents" element={<DocumentList />} />
      <Route path="/documents/detail/:id" element={<DocumentDetail />} />
      <Route path="*" element={<Navigate to="/documents" />} />
    </Routes>
  );
};
