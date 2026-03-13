import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

// 1. Mock des hooks personnalisés
const mockTools = [
  { id: 1, name: 'Slack', owner_department: 'Marketing' },
  { id: 2, name: 'Airtable', owner_department: 'Engineering' },
];

const mockSetTools = vi.fn();

vi.mock('../hooks/useTools', () => ({
  useTools: () => ({
    tools: mockTools,
    setTools: mockSetTools,
  }),
}));

vi.mock('../hooks/useToolActions', () => ({
  useToolActions: () => ({
    updateTool: vi.fn(),
    deleteTool: vi.fn(),
  }),
}));

describe('Dashboard Component', () => {
  it('trie les outils par nom de manière ascendante (A-Z)', () => {
    render(<Dashboard />);

    const nameHeader = screen.getByText(/Name/i);
    fireEvent.click(nameHeader);

    expect(mockSetTools).toHaveBeenCalled();

    const lastCall = mockSetTools.mock.calls[mockSetTools.mock.calls.length - 1][0];
    const sortedTools = typeof lastCall === 'function' ? lastCall(mockTools) : lastCall;

    expect(sortedTools[0].name).toBe('Airtable');
  });

  it('trie les outils par département', () => {
    render(<Dashboard />);

    const deptHeader = screen.getByText(/Departments/i);
    fireEvent.click(deptHeader);

    expect(mockSetTools).toHaveBeenCalled();

    const lastCall = mockSetTools.mock.calls[mockSetTools.mock.calls.length - 1][0];
    const sortedTools = typeof lastCall === 'function' ? lastCall(mockTools) : lastCall;

    expect(sortedTools[0].owner_department).toBe('Engineering');
  });
});