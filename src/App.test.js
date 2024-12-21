import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('file data', async () => {
  axios.get.mockResolvedValueOnce({ data: { files: ['test1.csv'] } });
  axios.get.mockResolvedValueOnce({
    data: { file: 'test1.csv', lines: [{ text: 'DDUDMOABJoxKnU', number: 3572127, hex: 'cb899e2ceeef5557ec8e018ad4cb164f' }] }
  });

  render(<App />);
  
  await waitFor(() => screen.getByText('File name'));

  expect(screen.getByText('File name')).toBeInTheDocument();
  expect(screen.getByText('DDUDMOABJoxKnU')).toBeInTheDocument();
});
