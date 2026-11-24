
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiHttpError } from '../api.js';
import { getTaskById } from '../task-api.js';
import type { Task } from '../types.js';

const TOKEN_KEY = 'task-api.access-token';

type DetailState =
  | { status: 'loading' }
  | { status: 'success'; task: Task }
  | { status: 'unauthorized' }
  | { status: 'not-found' }
  | { status: 'error'; message: string };

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();

  const [state, setState] = useState<DetailState>({
    status: 'loading',
  });

  useEffect(() => {
    let active = true;

    const loadTask = async () => {
      setState({ status: 'loading' });

      const token = sessionStorage.getItem(TOKEN_KEY);

      if (!token) {
        setState({ status: 'unauthorized' });
        return;
      }

      if (!id) {
        setState({ status: 'not-found' });
        return;
      }

      try {
        const response = await getTaskById(id, token);

        if (active) {
          setState({
            status: 'success',
            task: response.data,
          });
        }
      } catch (error: unknown) {
        if (!active) return;

        if (error instanceof ApiHttpError) {
          if (error.status === 401) {
            setState({ status: 'unauthorized' });
            return;
          }

          if (error.status === 404) {
            setState({ status: 'not-found' });
            return;
          }

          setState({
            status: 'error',
            message: error.message,
          });
          return;
        }

        setState({
          status: 'error',
          message: 'No fue posible consultar la tarea.',
        });
      }
    };

    void loadTask();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">EC3 F3 A12</p>
          <h1>Detalle de tarea</h1>
        </div>
      </header>

      <article className="panel">
        {state.status === 'loading' && (
          <p role="status">Cargando tarea...</p>
        )}

        {state.status === 'unauthorized' && (
          <p role="alert">
            Error 401: inicia sesión para consultar esta tarea.
          </p>
        )}

        {state.status === 'not-found' && (
          <p role="alert">
            Error 404: la tarea solicitada no existe.
          </p>
        )}

        {state.status === 'error' && (
          <p role="alert">{state.message}</p>
        )}

        {state.status === 'success' && (
          <section>
            <h2>{state.task.title}</h2>

            <p>
              <strong>ID:</strong> {state.task.id}
            </p>

            <p>
              <strong>Estado:</strong> {state.task.status}
            </p>

            <p>
              <strong>Creada:</strong> {state.task.createdAt}
            </p>

            <p>
              <strong>Actualizada:</strong> {state.task.updatedAt}
            </p>
          </section>
        )}

        <nav aria-label="Navegación de tareas">
          <Link to="/">Volver al listado de tareas</Link>
        </nav>
      </article>
    </main>
  );
}
