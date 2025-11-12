import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegistrationForm from '../components/RegistrationForm';

describe('RegistrationForm', () => {
  it('renders registration form with title', () => {
    render(<RegistrationForm />);
    expect(screen.getByText('Inscripción')).toBeInTheDocument();
  });

  it('renders all required form fields', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<RegistrationForm />);
    expect(screen.getByRole('button', { name: /completar inscripción/i })).toBeInTheDocument();
  });
});
