import { useState } from "react";
import "./App.css";

interface TitleProps {
  title: string;
}

interface HeaderProps extends TitleProps {
  noti: number;
}

const Layout = ({ children }: Readonly<React.PropsWithChildren>) => {
  return <div className="layout">{children}</div>;
};

const Header = ({ title, noti }: HeaderProps) => {
  return (
    <Layout>
      <h3>
        {title} - {noti}
      </h3>
    </Layout>
  );
};

const Footer = ({ title }: TitleProps) => {
  return (
    <Layout>
      <h4>{title}</h4>
    </Layout>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const name = "Furniture Shop";

  return (
    <>
      <Header title={name} noti={39} />
      <h1>Counter app</h1>
      <p className="logo">Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>+ Increase</button>
      <Layout>App layout</Layout>
      <Footer title="Counter Footer" />
    </>
  );
}

export default App;

// props
