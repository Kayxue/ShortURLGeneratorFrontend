import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ param: string }>;
}) {
	const param = (await params).param;

	const request = await fetch(
		`https://shorturlprojectbackend.fly.dev/shorturl/${param}`,
		{ method: "GET" }
	);

	const { status } = request;

	const data = await request.text();

	if (status === 201) {
		redirect(data);
	}

	//Use client component to display error message or password input
}
