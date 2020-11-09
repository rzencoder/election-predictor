import { render } from "@testing-library/react";
import { ShareLink } from "../../components";
import data from "../../data/states.json";
import userEvent from "@testing-library/user-event";

jest.mock("copy-to-clipboard", () => {
  return jest.fn();
});

describe("<ShareLink />", () => {
  it("renders the <ShareLink />", () => {
    const { container, getByTestId } = render(<ShareLink stateData={data} />);
    expect(getByTestId("share-link-button")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the link when the share map button is clicked", () => {
    const {
      container,
      getByTestId,
      getByText,
      queryByTestId,
      queryByText,
    } = render(<ShareLink stateData={data} />);
    expect(getByTestId("share-link-button")).toBeTruthy();
    expect(queryByText("Copy")).toBeNull();
    userEvent.click(getByTestId("share-link-button"));
    expect(queryByTestId("share-link-button")).toBeNull();
    expect(getByText("Copy")).toBeTruthy();
    userEvent.click(getByText("Copy"));
    expect(getByText("Copy")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
