import { afterEach, describe, expect, it, vi } from 'vitest';
import { API_URL } from '../src/api.js';
import { ApiHttpError, apiRequest } from '../src/api.js';
import { deleteTask, listTasks } from '../src/task-api.js';
import type { TaskListQuery, TaskListResponse } from '../src/types.js';
import { getTaskById } from '../src/task-api.js';
const query: TaskListQuery = {
    page: 2,
    limit: 5,
    status: 'pending',
    search: 'documentar',
    sortBy: 'createdAt',
    order: 'desc'
};
const listResponse: TaskListResponse = {
    data: [],
    meta: {
        page: 2,
        limit: 5,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
    }
};
afterEach(() => {
    vi.unstubAllGlobals();
});
describe('cliente HTTP de tareas', () => {
    it('construye la consulta y envía el token Bearer', async () => {
        const fetchMock = vi.fn<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>();
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(listResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
        vi.stubGlobal('fetch', fetchMock);
        await expect(listTasks(query, 'token-de-prueba')).resolves.toEqual(listResponse);
        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0] ?? [];
        expect(String(url)).toContain('/api/tasks?page=2&limit=5');
        expect(String(url)).toContain('status=pending');
        expect(String(url)).toContain('search=documentar');
        expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer token-de-prueba');
    });
    it('acepta una eliminación 204 sin intentar analizar JSON', async () => {
        const fetchMock = vi.fn<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>();
        fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }));
        vi.stubGlobal('fetch', fetchMock);
        await expect(deleteTask('67112bfe47963b2be12c43b1', 'token')).resolves.toBeUndefined();
    });
    it('convierte el contrato de error de la API en ApiHttpError', async () => {
        const fetchMock = vi.fn<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>();
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
            error: {
                code: 'FORBIDDEN',
                message: 'No tienes permisos.',
                requestId: 'req-123'
            }
        }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        }));
        vi.stubGlobal('fetch', fetchMock);
        const result = apiRequest('/api/tasks/id', { method: 'DELETE' }, 'token');
        await expect(result).rejects.toMatchObject({
            status: 403,
            code: 'FORBIDDEN',
            requestId: 'req-123',
            message: 'No tienes permisos.',
        });
    });
});


describe('getTaskById', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('consulta una tarea utilizando el token Bearer', async () => {
    const task = {
      id: 'task-123',
      title: 'Tarea de prueba',
      status: 'pending',
      createdAt: '2026-11-23T10:00:00.000Z',
      updatedAt: '2026-11-23T10:00:00.000Z',
    };

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: task }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    vi.stubGlobal('fetch', fetchMock);

    const response = await getTaskById('task-123', 'token-prueba');

    expect(response.data).toEqual(task);
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, options] = fetchMock.mock.calls[0];

    expect(url).toBe(
      `${API_URL}/api/tasks/task-123`
    );

    expect(options.headers.get('Authorization')).toBe(
      'Bearer token-prueba'
    );

    expect(options.method ?? 'GET').toBe('GET');
  });

  it('devuelve un error 404 cuando la tarea no existe', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: {
              code: 'TASK_NOT_FOUND',
              message: 'La tarea no existe.',
            },
          }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      )
    );

    await expect(
      getTaskById('inexistente', 'token-prueba')
    ).rejects.toMatchObject({
      status: 404,
      code: 'TASK_NOT_FOUND',
    });
  });
});
