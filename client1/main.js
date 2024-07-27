document.addEventListener("DOMContentLoaded", () => {
  //   const socket = io("http://localhost:3000"); // Đảm bảo đúng địa chỉ server
  const socket = io(process.env.SERVER_API_POINT); // Đảm bảo đúng địa chỉ server

  // Gửi thông điệp
  const form = document.querySelector(".message_form");
  const input = document.querySelector(".message_form__input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit("chat message", input.value);
      input.value = "";
    }
  });

  // Nhận thông điệp
  socket.on("chat message", function (msg) {
    const item = document.createElement("li");
    item.textContent = msg;
    document.querySelector(".messages__history").appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
});
