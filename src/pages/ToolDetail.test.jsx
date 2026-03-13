import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ToolDetail from './ToolDetail';

// 1. Mock du hook useTool
const mockTool = {
  id: '123',
  name: 'Figma',
  status: 'active',
  vendor: 'Adobe',
  category: 'Design',
  description: 'Outil de design collaboratif',
  active_users_count: 50,
  monthly_cost: 120,
  owner_department: 'Design',
  updated_at: '2024-01-01T00:00:00.000Z',
  website_url: 'https://figma.com'
};

vi.mock('../hooks/useTool', () => ({
  useTool: (id) => {
    if (id === '123') return { tool: mockTool, loading: false, error: null };
    return { tool: null, loading: false, error: null };
  }
}));

vi.mock('../components/ToolImg', () => ({
  default: () => <div data-testid="tool-img" />
}));

describe('Page ToolDetail', () => {
  it('affiche correctement les informations de l outil', () => {
    render(
      <MemoryRouter initialEntries={['/tool/123']}>
        <Routes>
          <Route path="/tool/:id" element={<ToolDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Figma')).not.toBeNull();
    expect(screen.queryByText('50')).not.toBeNull();
  });

  it('affiche un message de chargement', async () => {
    // On change temporairement le mock pour simuler le chargement
    vi.spyOn(await import('../hooks/useTool'), 'useTool').mockReturnValue({
      tool: null, loading: true, error: null
    });

    render(
      <MemoryRouter>
        <ToolDetail />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Chargement/)).not.toBeNull();
  });
});