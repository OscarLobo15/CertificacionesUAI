import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { supabase } from '../supabaseClient';
import '@testing-library/jest-dom';

// Mock data for testing
const mockUserInfo = [{ career: '0' }, { career: '1' }];
const mockPdfInfo = [{ verificate: 'some verification info', pdfname: 'some_pdf.pdf' }];
const mockCertificates = [{ career: '0' }, { career: '1' }];
const mockPdfInfoData = [{ some: 'pdf', info: 'data' }];

// Mock the supabase client
jest.mock('../supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    auth: {
      getSession: jest.fn(),
    },
  },
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders Analytics Dashboard heading', async () => {
    supabase.from.mockImplementation((table) => {
      switch (table) {
        case 'userinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockUserInfo, error: null }) };
        case 'pdfinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfo, error: null }) };
        case 'certificates':
          return { select: jest.fn().mockResolvedValue({ data: mockCertificates, error: null }) };
        case 'pdfInfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfoData, error: null }) };
        default:
          return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      }
    });

    render(<Dashboard />);

    const headingElement = await screen.findByText('Analytics Dashboard');
    expect(headingElement).toBeInTheDocument();
  });

  test('fetches and renders number of students per career chart', async () => {
    supabase.from.mockImplementation((table) => {
      switch (table) {
        case 'userinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockUserInfo, error: null }) };
        case 'pdfinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfo, error: null }) };
        case 'certificates':
          return { select: jest.fn().mockResolvedValue({ data: mockCertificates, error: null }) };
        case 'pdfInfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfoData, error: null }) };
        default:
          return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      }
    });

    render(<Dashboard />);

    const chartElement = await screen.findByText('Number of Students Per Career');
    expect(chartElement).toBeInTheDocument();
  });

  test('fetches and renders number of certificates per career chart', async () => {
    supabase.from.mockImplementation((table) => {
      switch (table) {
        case 'userinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockUserInfo, error: null }) };
        case 'pdfinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfo, error: null }) };
        case 'certificates':
          return { select: jest.fn().mockResolvedValue({ data: mockCertificates, error: null }) };
        case 'pdfInfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfoData, error: null }) };
        default:
          return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      }
    });

    render(<Dashboard />);

    const chartElement = await screen.findByText('Number of Certificates Per Career');
    expect(chartElement).toBeInTheDocument();
  });

  test('fetches and renders most common certificates list', async () => {
    supabase.from.mockImplementation((table) => {
      switch (table) {
        case 'userinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockUserInfo, error: null }) };
        case 'pdfinfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfo, error: null }) };
        case 'certificates':
          return { select: jest.fn().mockResolvedValue({ data: mockCertificates, error: null }) };
        case 'pdfInfo':
          return { select: jest.fn().mockResolvedValue({ data: mockPdfInfoData, error: null }) };
        default:
          return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      }
    });

    render(<Dashboard />);

    const listElement = await screen.findByText('Most Common Certificates');
    expect(listElement).toBeInTheDocument();

    const certificateItem = await screen.findByText('some_pdf.pdf (used by 1 users)');
    expect(certificateItem).toBeInTheDocument();
  });
});
