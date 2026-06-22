import React from 'react';

function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">单词记忆卡</h1>
      </header>
      <main className="layout__main">
        <div className="layout__placeholder">
          <p>页面占位区域</p>
          <p className="layout__hint">功能开发中...</p>
        </div>
      </main>
    </div>
  );
}

export default Layout;
