import app from "./class/app"
import { PORT } from "./constants/config"

app.listen(PORT, () => {
  console.log("Listening on port " + PORT)
})