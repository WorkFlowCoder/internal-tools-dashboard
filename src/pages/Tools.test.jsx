import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Tools from './Tools';

vi.mock('../hooks/useTools', () => ({
  useTools: () => ({
    tools: [
      { id: 1, name: 'Slack', owner_department: 'Marketing', status: 'active', category: 'Communication' },
      { id: 2, name: 'Jira', owner_department: 'Engineering', status: 'unused', category: 'Project Management' },
    ],
    setTools: vi.fn(),
  }),
}));

vi.mock('../hooks/useToolActions', () => ({
  useToolActions: () => ({ createTool: vi.fn(), updateTool: vi.fn(), deleteTool: vi.fn() }),
}));

describe('Page Tools', () => {
  it('devrait filtrer la liste quand on recherche un nom', () => {
    render(
      <MemoryRouter>
        <Tools />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Slack')).not.toBeNull();
    expect(screen.queryByText('Jira')).not.toBeNull();

    const input = screen.getByPlaceholderText('Rechercher...');
    fireEvent.change(input, { target: { value: 'Slack' } });

    // Vérification du filtre
    expect(screen.queryByText('Slack')).not.toBeNull();
    expect(screen.queryByText('Jira')).toBeNull();
  });
});