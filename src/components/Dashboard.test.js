import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
// Mock data for testing
const mockData = {
  userinfo: [{ career: 'Engineering' }],
  pdfinfo: [{ verificate: 'some verification info', pdfname: 'some_pdf.pdf' }],
  certificates: [{ career: 'Engineering' }],
  pdfInfo: [{ some: 'pdf', info: 'data' }],
};
describe('Dashboard Component', () => {
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );

  test('renders Analytics Dashboard heading', async () => {
    render(<Dashboard />);
    const headingElement = screen.getByText('Analytics Dashboard');
    expect(headingElement).toBeInTheDocument();
  });

  test('fetches and renders number of students per career chart', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      const chartElement = screen.getByText('Number of Students Per Career');
      expect(chartElement).toBeInTheDocument();
    });
  });

});
