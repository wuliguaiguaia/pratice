const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      {/* <Sidebar /> */}
      <Content />
    </div>
  );
}


// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

class ProfilePage extends React.Component {
  static contextType = ThemeContext
  render() {
    console.log(this.context);
    return (
      <div>{this.props.user} {this.props.theme}</div>
    )
  }
}

ReactDOM.render(<App signedInUser="fd" theme="dark"/>, document.querySelector('#root'));