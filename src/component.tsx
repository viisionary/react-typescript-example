import React from "react";

const FnComponent = ({ message }: { message: string }): JSX.Element => (
  <div>{message}</div>
);

// React.FC 隐含一个children
const Title: React.FC<{ title: string }> = ({ children, title }) => (
  <div title={title}>{children}</div>
);

type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};

class ClassComponent extends React.Component<MyProps, MyState> {
  state: MyState = {
    count: 0
  };
  pointer: number = 1;
  render() {
    return (
      <div>
        {this.props.message}
        {this.state.count}
        {this.pointer}
      </div>
    );
  }
}
interface IProps {
  name: string;
}
const defaultProps = {
  age: 25
};
const GreetComponent = ({ name, age }: IProps & typeof defaultProps) => (
  <div>{`Hello, my name is ${name}, ${age}`}</div>
);
/**
 * 取到组件的 props 包括 IProps 和 typeofdefaultProps
 */
type ComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;

// React.ComponentProps 取不到age
const TestComponent2 = (props: React.ComponentProps<typeof GreetComponent>) => {
  return <h1 />;
};
const TestComponent = (props: ComponentProps<typeof GreetComponent>) => {
  return <h1 />;
};
