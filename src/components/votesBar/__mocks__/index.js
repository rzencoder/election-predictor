jest.mock("react-confetti", () => {
  return {
    default: () => {
      return <div></div>;
    },
  };
});
