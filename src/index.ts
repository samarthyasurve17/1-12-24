import { Hono } from "hono";
import { calculateReadingTime } from "./utils";

const app = new Hono();

let defaultWPM = 238;

// ====== MARK: API routes
// @desc API status
// @route GET /status
// @access public
app.get("/status", (c) => {
  return c.json({ message: "API is active 🚀", status: "ok" });
});

// @desc Calculate reading time
// @route GET /api/calculate
// @access public
app.get("/api/calculate", (c) => {
  const sentence = c.req.query("sentence");
  const wpm = c.req.query("wpm"); // Optional

  if (!sentence) {
    return c.json({ message: "Field sentence is required" }, 400);
  }

  const readingTime = calculateReadingTime(sentence, Number(wpm) || defaultWPM);

  return c.json({ ...readingTime });
});

// @desc Calculate reading time
// @route POST /api/calculate
// @access public
app.post("/api/calculate", async (c) => {
  const { sentence, wpm } = await c.req.json();

  if (!sentence) {
    return c.json({ message: "Field sentence is required" }, 400);
  }

  const readingTime = calculateReadingTime(sentence, Number(wpm) || defaultWPM);

  return c.json({ ...readingTime });
});

export default app;