import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getRouterData } from './common/router';
// import Authorized from './utils/Authorized';
// import { getQueryPath } from './utils/utils';

const { ConnectedRouter } = routerRedux;
// const { AuthorizedRoute } = Authorized;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={BasicLayout} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
