import { render, screen } from "@testing-library/react";
import App from "./App";
import { userEvent } from "./utils/test-utils";
import { server } from "./test/mocks/server";
import { HttpResponse, http } from "msw";

describe("Test", () => {
	it("testing the vitest", () => {
		expect(true).toBeTruthy();
	});

	it("checking whether vite and react text is available", () => {
		render(<App />);
		const text = screen.getByText("Vite + React");
		expect(text).toBeInTheDocument();
	});

	it("should increment count on click", async () => {
		render(<App />);
		userEvent.click(screen.getByRole("button"));
		expect(await screen.findByText(/count is 1/i)).toBeInTheDocument();
	});

	it("api success scenario on load", async () => {
		render(<App />);
		expect(await screen.findByText("Todo List : 1")).toBeInTheDocument();
	});

	it("api error scenario on load", () => {
		render(<App />);
		server.use(
			http.get("https://dummyjson.com/todos", () => {
				return new HttpResponse(null, { status: 401 });
			})
		);
		expect(screen.queryByText("Todo List")).not.toBeInTheDocument();
	});
});
