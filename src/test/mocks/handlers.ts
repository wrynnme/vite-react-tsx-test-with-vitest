import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("https://dummyjson.com/todos", () => {
		return HttpResponse.json(
			{
				todos: [
					{
						id: 1,
						todo: "Do Something nice for someone I care about",
						complete: true,
						userId: 26,
					},
				],
			},
			{ status: 200 }
		);
	}),
];
