import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../stores';
import Providers from '../contexts/providers';

const customRender = (
  component: ReactElement,
  options?: RenderOptions,
): RenderResult => render(
  <Provider store={store}><Providers>{component}</Providers></Provider>,
  options,
);

export * from '@testing-library/react';

export { customRender as render };
