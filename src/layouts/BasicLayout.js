import React from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'antd';
import { connect } from 'dva';

class BasicLayout extends React.PureComponent {
  getBaseRedirect = () => {
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');

    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData } = this.props;
      return Object.keys(routerData).find(item => {
        return item && item !== '/';
      });
    }
    return redirect;
  };

  render() {
    const baseRedirect = this.getBaseRedirect();

    const layout = (
      <Layout>
        <div>hello world `${baseRedirect}`</div>
      </Layout>
    );

    return <DocumentTitle title="国寿企业客户数据管理">{layout}</DocumentTitle>;
  }
}

export default connect()(BasicLayout);
