export const withLogger = (Component) => {
  return (props) => {
    const logging = (action, task) => {
      console.log(`${action}:`, task);
    };

    return <Component {...props} logging={logging} />;
  };
};
