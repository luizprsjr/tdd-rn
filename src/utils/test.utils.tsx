import React from 'react';
import {legacy_createStore as createStore} from 'redux';
import rootReducer from '../store/reducers';
import {ReactElement} from 'react';
import {Provider} from 'react-redux';
import {RenderOptions, render} from '@testing-library/react-native';
import {runSaga} from 'redux-saga';

type Action = {
  type?: any;
  payload?: any;
};

const store = createStore(rootReducer);

type CustomRenderOptions = {
  store?: typeof store;
};

export async function recordSaga(worker: any, initialAction: Action) {
  const dispatched: Array<Function> = [];

  await runSaga(
    {
      dispatch: (action: Function) => dispatched.push(action),
    },
    worker,
    initialAction,
  ).toPromise();

  return dispatched;
}

const AllTheProviders =
  (options: CustomRenderOptions) =>
  ({children}: {children: React.ReactNode}) => {
    return <Provider store={options.store || store!}>{children}</Provider>;
  };

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'queries'> = {},
) => {
  const {store, ...others} = options;
  return render(ui, {
    wrapper: AllTheProviders({store}) as React.ComponentType,
    ...others,
  });
};

export * from '@testing-library/react-native';
export {customRender as render};
