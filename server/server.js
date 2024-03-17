const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose
  .connect(
    "mongodb://localhost:27017/wisol",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("đã kết nối tới MongoDB");
  })
  .catch((error) => {
    console.error("lỗi kết nối", error);
  });

const wifiSchema = new mongoose.Schema({
  name: String,
  address: String,
  password: String,
  sol: Number,
})

const Wifi = mongoose.model("wifi", wifiSchema)

app.get('/wifis', async (req, res) => {
  try {
    const wifis = await Wifi.find({});
    res.json(wifis);
  } catch (error) {
    console.error("Error fetching wifis:", err);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/api/wifi", (req, res) => {
  const { name, address, password, sol } = req.body;

  const newWifi = new Wifi({
    name,
    address,
    password,
    sol,
  });

  newWifi
    .save()
    .then(() => {
      res.status(201).json({ message: "Đã lưu đối tượng vào MongoDB" });
    })
    .catch((error) => {
      console.error("Lỗi lưu đối tượng vào MongoDB:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi server" });
    });
})

app.put("/wifi/edit/:id", (req, res) => {
  const id = req.params.id;
  const updateData = {
    name: req.body.name,
    address: req.body.address,
    password: req.body.password,
    sol: req.body.sol,
  };
  Wifi.findByIdAndUpdate(id, updateData, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Dữ liệu đã được cập nhật thành công",
          data: data,
        });
      } else {
        res.status(404).json({ error: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    });
})

app.delete("/wifi/delete/:id", (req, res) => {
  const idToDelete = req.params.id;
  Wifi.findByIdAndDelete(idToDelete)
    .then((data) => {
      if (data) {
        res
          .status(200)
          .json({ message: "Dữ liệu đã được xóa thành công", data: data });
      } else {
        res.status(404).json({ error: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi xóa dữ liệu" });
    });
})

const port = 3000;
app.listen(port, () => {
  console.log(`server đang lắng nghe tại cổng ${port}`);
});
