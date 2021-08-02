import React, {
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
  useImperativeHandle,
  forwardRef,
  HTMLProps
} from "react";
type IUser = {
  name: string;
};
const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    // es2015 没有finally es lib要配置 2018
    return aPromise.finally(() => setState(false));
  };
  // readonly的常量
  return [isLoading, load] as const;
}
export interface MyInputHandles {
  focus(): void;
}

/**
 * 继承原生input 的 porps
 */
interface MyInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

const MyInput: ForwardRefRenderFunction<MyInputHandles, MyInputProps> = (
  props,
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("?1??");

  /**
   * 向父组件暴露一些方法 与forwardRef配合使用
   * ⬇️ focus & blur 可在父组件中使用
   */
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    blur: () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }));

  return (
    <>
      {props.label}
      <input {...props} ref={inputRef} />
    </>
  );
};
const Input = forwardRef(MyInput);
interface ContextState {
  name: string;
}
// 用一个空对象作默认值
const Context = React.createContext({} as ContextState);
// 提供默认值
const Context2 = React.createContext<ContextState>({ name: "John" });
// 默认值是undefined 稍后初始化
const currentUserContext = React.createContext<string>(undefined!);
export const ShowHooks = () => {
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = "divRef.current.innerHTML";
    }
  }, [divRef]);

  return (
    <>
      <h6>node_modules/@types/react/index.d.ts</h6>
      <table>
        <thead>
          <tr>
            <td> - </td>
            <td>类型</td>
          </tr>
        </thead>
        <tr>
          <td>Event的类型 需要一个参数【标签类型】</td>
          <td>ChangeEvent</td>
          <td>FormEvent</td>
          <td>KeyboardEvent</td>
          <td>
            <a href="">more</a>
          </td>
        </tr>
        <tr>
          <th>html 标签的类型</th>
          <td>HTMLElement</td>
          <td>HTMLInputElement</td>
          <td>HTMLDivElement</td>
          <td>
            <a href="">more</a>
          </td>
        </tr>
        <tr>
          <th>React 组件类型</th>
          <td>React.ReactNode 包含各种类型 </td>
          <td>React.CSSProperties</td>
        </tr>
        <tr></tr>
      </table>
      <div
        onMouseEnter={() => {
          if (inputRef.current) {
            inputRef.current?.focus();
          }
        }}
        onMouseLeave={() => {
          if (inputRef.current) {
            inputRef.current?.blur();
          }
        }}
      >
        <Input
          ref={inputRef}
          label={"请输入用户名："}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUser({ name: e.target.value });
          }}
        />
        <div>用户名：{user.name}</div>
        <div>{state.count}</div>
        <div ref={divRef}></div>
      </div>
      <h6>useContext</h6>
      <div></div>
    </>
  );
};
