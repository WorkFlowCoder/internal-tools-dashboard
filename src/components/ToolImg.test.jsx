import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ToolImg from './ToolImg';

describe('Composant ToolImg', () => {
  const mockTool = {
    name: 'Figma',
    icon_url: 'https://example.com/figma.png'
  };

  it('affiche l icône du tool quand elle est fournie', () => {
    render(<ToolImg tool={mockTool} className="w-10" />);
    
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe('https://example.com/figma.png');
    expect(img.getAttribute('alt')).toBe('Figma');
  });

  it('affiche un avatar fallback si icon_url est invalide ou vide', () => {
    const toolWithoutIcon = { name: 'Slack', icon_url: '' };
    render(<ToolImg tool={toolWithoutIcon} />);
    
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toContain('ui-avatars.com');
    expect(img.getAttribute('src')).toContain('Slack');
  });

  it('bascule sur le fallback quand l image source rencontre une erreur', () => {
    render(<ToolImg tool={mockTool} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    
    expect(img.getAttribute('src')).toContain('ui-avatars.com');
  });
});