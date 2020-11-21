import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Selector from '../Components/Input/Selector';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const airportData = ['A', 'B', 'C'];
const formData = { start: 'A', finish: 'B' };

describe('Selector Component Tests', () => {
  it('renders the label correctly with isStart true', () => {
    act(() => {
      render(
        <Selector airportData={airportData} formData={formData} handleChange={() => {}} isStart />,
        container,
      );
      expect(container.textContent).toMatch('Starting Airport');
    });
  });

  it('renders the label correctly with isStart false', () => {
    act(() => {
      render(
        <Selector
          airportData={airportData}
          formData={formData}
          handleChange={() => {}}
          isStart={false}
        />,
        container,
      );
      expect(container.textContent).toMatch('Destination');
    });
  });
});
