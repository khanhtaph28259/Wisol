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

// Mô hình User
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  address: String,
});

const User = mongoose.model("User", userSchema);

let currentUser = null;

// Đăng ký
app.post("/register", (req, res) => {
  const { username, password, fullname, address } = req.body;

  const newUser = new User({
    username,
    password, // Lưu ý: trong thực tế, bạn nên mã hóa mật khẩu trước khi lưu
    fullname,
    address,
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "Đã đăng ký thành công" });
    })
    .catch((error) => {
      console.error("Lỗi khi đăng ký:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi server" });
    });
});

// Đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password }) // Lưu ý: trong thực tế, bạn nên mã hóa mật khẩu trước khi so sánh
    .then((user) => {
      if (user) {
        currentUser = user;
        res.status(200).json({ message: "Đăng nhập thành công", user });
      } else {
        res.status(401).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
    })
    .catch((error) => {
      console.error("Lỗi khi đăng nhập:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi server" });
    });
});

app.get('/wifis', async (req, res) => {
  try {
    let wifis = await Wifi.find({});
    if (currentUser) {
      wifis = wifis.sort((a, b) => {
        const aMatch = a.address.includes(currentUser.address);
        const bMatch = b.address.includes(currentUser.address);
        if (aMatch && !bMatch) {
          return -1;
        } else if (!aMatch && bMatch) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    res.json(wifis);
  } catch (error) {
    console.error("Error fetching wifis:", error);
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
