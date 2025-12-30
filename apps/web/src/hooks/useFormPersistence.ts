import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function useFormPersistence(methods: UseFormReturn<any>, key: string) {
  useEffect(() => {
    // Cargar datos al montar
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        methods.reset(parsed);
      } catch (e) {
        console.error("Error parsing stored form data", e);
      }
    }
  }, [key, methods.reset]); // Solo al cambiar la key (montaje)

  useEffect(() => {
    // Suscribirse a cambios
    const subscription = methods.watch((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, key]);
}
