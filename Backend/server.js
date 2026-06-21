const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const invitationRoutes =
  require("./routes/invitationRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DevConnect API Running");
});

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/projects",
  require("./routes/projectRoutes")
);
app.use(
  "/api/tasks",
  require("./routes/taskRoutes")
);
app.use(
  "/api/reports",
  require(
    "./routes/dailyReportRoutes"
  )
);
app.use(
  "/api/invitations",
  invitationRoutes
);
app.use(
  "/api/requests",
  require("./routes/requestRoutes")
);
app.use(
  "/api/notifications",
  require("./routes/notificationRoutes")
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});