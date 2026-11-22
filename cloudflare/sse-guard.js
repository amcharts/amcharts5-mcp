// The agents library parses a legacy SSE message's body without a guard. The
// parse error quotes the body, and an error that reaches the runtime is logged,
// so broken JSON on that route is answered here and its error goes no further.
export async function rejectBrokenJson(request, serve) {
  if (request.method !== "POST" || new URL(request.url).pathname !== "/sse/message") {
    return serve();
  }
  try {
    return await serve();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return new Response("Invalid JSON", { status: 400 });
    }
    throw error;
  }
}
